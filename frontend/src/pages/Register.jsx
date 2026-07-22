import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.role);
      navigate("/login");
    } catch (err) {
      setError(
        err.message ||
          err.errors?.[0]?.msg ||
          "Unable to register. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white border-t-4 border-amber rounded-md shadow-sm p-8">
          <h1 className="font-display text-3xl uppercase mb-1">
            Create account
          </h1>
          <p className="text-sm text-steel mb-6">
            Join Ironclad Motors' inventory system.
          </p>

          {error && (
            <div className="bg-rust/10 border border-rust/30 text-rust text-sm rounded-sm px-3 py-2 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-steel mb-1 font-mono">
                Full name
              </label>
              <input
                required
                value={form.name}
                onChange={update("name")}
                className="w-full border border-ink/15 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-steel mb-1 font-mono">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={update("email")}
                className="w-full border border-ink/15 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-steel mb-1 font-mono">
                Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={form.password}
                onChange={update("password")}
                className="w-full border border-ink/15 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
              />
            </div>
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
              className="w-full bg-ink hover:bg-ink-light text-paper font-semibold uppercase tracking-wide text-xs py-2.5 rounded-sm transition-colors disabled:opacity-60"
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
