import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(email, password);

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to log in. Please try again.",
      );
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

          {error && (
            <div className="bg-rust/10 border border-rust/30 text-rust text-sm rounded-sm px-3 py-2 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-steel mb-1 font-mono">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-ink/15 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ink hover:bg-ink-light text-paper font-semibold uppercase tracking-wide text-xs py-2.5 rounded-sm transition-colors disabled:opacity-60"
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
