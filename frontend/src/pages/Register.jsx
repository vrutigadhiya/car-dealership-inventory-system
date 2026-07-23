import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Synchronized client validation rules matching express-validator
  const validateField = (name, value) => {
    if (name === "name") {
      const trimmed = value.trim();
      if (!trimmed) return "Name is required";
      if (trimmed.length < 3 || trimmed.length > 50)
        return "Name must be between 3 and 50 characters";
      if (!/^[A-Za-z\s]+$/.test(trimmed))
        return "Name can contain only letters and spaces";
    }

    if (name === "email") {
      const trimmed = value.trim();
      if (!trimmed) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed))
        return "Enter a valid email address";
    }

    if (name === "password") {
      if (!value) return "Password is required";
      if (value.length < 8) return "Password must be at least 8 characters";
      if (!/[A-Z]/.test(value))
        return "Password must contain at least one uppercase letter";
      if (!/[a-z]/.test(value))
        return "Password must contain at least one lowercase letter";
      if (!/[0-9]/.test(value))
        return "Password must contain at least one number";
      if (!/[!@#$%^&*(),.?":{}|<>_]/.test(value))
        return "Password must contain at least one special character";
    }

    return "";
  };

  const update = (field) => (e) => {
    const val = e.target.value;
    setForm((prev) => ({ ...prev, [field]: val }));

    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleBlur = (field) => () => {
    const error = validateField(field, form[field]);
    setFieldErrors((prev) => ({ ...prev, [field]: error }));
  };

  const validateAll = () => {
    const errors = {};
    ["name", "email", "password"].forEach((field) => {
      const err = validateField(field, form[field]);
      if (err) errors[field] = err;
    });
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    setGeneralError("");

    if (!validateAll()) return;

    setLoading(true);

    try {
      await register(form.name, form.email, form.password, form.role);
      navigate("/login");
    } catch (err) {
      const responseData = err.response?.data;

      // Map express-validator error array directly to form fields
      if (responseData?.errors && Array.isArray(responseData.errors)) {
        const backendErrors = {};
        responseData.errors.forEach((e) => {
          if (e.path) backendErrors[e.path] = e.msg;
        });
        setFieldErrors(backendErrors);
      } else {
        setGeneralError(
          responseData?.message ||
            err.message ||
            "Unable to register. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white border-t-4 border-amber rounded-md shadow-sm p-8">
          <h1 className="font-display text-3xl uppercase mb-1">Create account</h1>
          <p className="text-sm text-steel mb-6">
            Join Ironclad Motors' inventory system.
          </p>

          {generalError && (
            <div className="bg-rust/10 border border-rust/30 text-rust text-sm rounded-sm px-3 py-2 mb-4">
              {generalError}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4" noValidate>
            {/* Full Name */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-steel mb-1 font-mono">
                Full name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={update("name")}
                onBlur={handleBlur("name")}
                className={`w-full border rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                  fieldErrors.name
                    ? "border-red-500 focus:ring-red-400"
                    : "border-ink/15 focus:ring-amber"
                }`}
              />
              {fieldErrors.name && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-steel mb-1 font-mono">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={update("email")}
                onBlur={handleBlur("email")}
                className={`w-full border rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                  fieldErrors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "border-ink/15 focus:ring-amber"
                }`}
              />
              {fieldErrors.email && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-steel mb-1 font-mono">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={update("password")}
                  onBlur={handleBlur("password")}
                  className={`w-full border rounded-sm px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 ${
                    fieldErrors.password
                      ? "border-red-500 focus:ring-red-400"
                      : "border-ink/15 focus:ring-amber"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-steel hover:text-ink cursor-pointer"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {/* Account Type */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-steel mb-1 font-mono">
                Account type
              </label>
              <select
                value={form.role}
                onChange={update("role")}
                className="w-full border border-ink/15 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber bg-white"
              >
                <option value="user">User</option>
                <option value="admin">Admin (dealership staff)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-ink hover:bg-ink-light text-paper font-semibold uppercase tracking-wide text-xs py-2.5 rounded-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="text-sm text-steel mt-6 text-center">
            Already registered?{" "}
            <Link
              to="/login"
              className="text-ink font-semibold hover:text-amber-dark"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}