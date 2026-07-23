import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Field validation rules matching basic client check
  const validateField = (name, value) => {
    if (name === "email") {
      if (!value.trim()) return "Email is required";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Enter a valid email address";
    }
    if (name === "password") {
      if (!value.trim()) return "Password is required";
    }
    return "";
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));

    // Clear field-specific and general errors as user types
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    }
    if (generalError) {
      setGeneralError("");
    }
  };

  const handleBlur = (field) => () => {
    const error = validateField(field, form[field]);
    setFieldErrors((prev) => ({ ...prev, [field]: error }));
  };

  const validateAll = () => {
    const errors = {};
    Object.keys(form).forEach((field) => {
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
      const user = await login(form.email, form.password);
      if (user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      const responseData = err.response?.data || err;

      // Handle express-validator mapped array response ({ field, message })
      if (responseData?.errors && Array.isArray(responseData.errors)) {
        const backendErrors = {};
        responseData.errors.forEach((e) => {
          const fieldName = e.field || e.path;
          const msg = e.message || e.msg;
          if (fieldName) backendErrors[fieldName] = msg;
        });
        setFieldErrors(backendErrors);
      } else {
        setGeneralError(
          responseData?.message || "Unable to log in. Please try again."
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
          <h1 className="font-display text-3xl uppercase mb-1">Welcome back</h1>
          <p className="text-sm text-steel mb-6">
            Log in to browse and manage the lot.
          </p>

          {generalError && (
            <div className="bg-rust/10 border border-rust/30 text-rust text-sm rounded-sm px-3 py-2 mb-4">
              {generalError}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4" noValidate>
            {/* Email Field */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-steel mb-1 font-mono">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={handleChange("email")}
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

            {/* Password Field */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-steel mb-1 font-mono">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange("password")}
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
                <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-ink hover:bg-ink-light text-paper font-semibold uppercase tracking-wide text-xs py-2.5 rounded-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in…" : "Log in"}
            </button>
          </form>

          <p className="text-sm text-steel mt-6 text-center">
            New here?{" "}
            <Link
              to="/register"
              className="text-ink font-semibold hover:text-amber-dark"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}