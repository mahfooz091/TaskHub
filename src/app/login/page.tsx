"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { authAPI, setToken } from "@/lib/api";

export default function Login() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<"email" | "google" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate inputs
      if (!email.trim()) {
        throw new Error("Email is required");
      }
      if (!password) {
        throw new Error("Password is required");
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email");
      }

      // Call login API
      const response = await authAPI.login(email, password);
      
      if (response.access_token) {
        setToken(response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setSuccess(true);

        // Show success message and redirect
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      // For demo: use the same login as email (Google OAuth would be integrated here)
      if (!email.trim()) {
        throw new Error("Email is required for demo Google login");
      }

      const response = await authAPI.login(email, password || "demo");
      
      if (response.access_token) {
        setToken(response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setSuccess(true);

        // Show success message and redirect
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-blue-100">
            <div className="text-center mb-8">
              <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-3xl mx-auto mb-4">
                T
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-gray-600 mt-2">Log in to your TaskHub account</p>
            </div>

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg"
              >
                <p className="text-green-700 font-semibold">✓ Login successful!</p>
                <p className="text-green-600 text-sm">Redirecting to dashboard...</p>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <p className="text-red-700 font-semibold">✕ {error}</p>
              </motion.div>
            )}

            {/* Login Method Selection */}
            {!loginMethod ? (
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setLoginMethod("email")}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                >
                  <span className="text-xl">✉️</span>
                  Log in with Email
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-400 hover:bg-blue-50 transition-all disabled:opacity-50"
                >
                  <span className="text-xl">🔵</span>
                  Continue with Google
                </motion.button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLoginMethod(null)}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                  >
                    ← Back to options
                  </motion.button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  disabled={loading}
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-gray-700">Password</label>
                  <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                    Forgot?
                  </Link>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  disabled={loading}
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading || success}
                className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
              >
                {loading ? "Logging in..." : success ? "Success! Redirecting..." : "Log In"}
              </motion.button>
            </form>
              </>
            )}

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
