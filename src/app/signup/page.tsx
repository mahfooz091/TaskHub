"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { authAPI, setToken } from "@/lib/api";

export default function Signup() {
  const router = useRouter();
  const [signupMethod, setSignupMethod] = useState<"email" | "google" | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate inputs
      if (!formData.name.trim()) {
        throw new Error("Name is required");
      }
      if (!formData.email.trim()) {
        throw new Error("Email is required");
      }
      if (!formData.password) {
        throw new Error("Password is required");
      }
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email");
      }

      console.log('Attempting signup with:', {
        email: formData.email,
        name: formData.name,
        username: formData.name.replace(/\s+/g, '').toLowerCase()
      });

      // Call signup API
      const response = await authAPI.signup(
        formData.email,
        formData.name.replace(/\s+/g, '').toLowerCase(), // Generate username from name
        formData.password,
        formData.name
      );
      
      console.log('Signup successful:', response);
      
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
      const errorMsg = err instanceof Error ? err.message : "Signup failed";
      console.error('Signup error:', errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setLoading(true);

    try {
      // For demo: use email as username
      const response = await authAPI.signup(
        formData.email || 'user@google.com',
        'Google User',
        Math.random().toString(36).slice(-10),
        'Google User'
      );
      
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
      setError(err instanceof Error ? err.message : "Google signup failed");
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
              <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
              <p className="text-gray-600 mt-2">Join thousands earning with TaskHub</p>
            </div>

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg"
              >
                <p className="text-green-700 font-semibold">✓ Account created successfully!</p>
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

            {/* Signup Method Selection */}
            {!signupMethod ? (
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSignupMethod("email")}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                >
                  <span className="text-xl">✉️</span>
                  Sign up with Email
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoogleSignup}
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
                    onClick={() => setSignupMethod(null)}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                  >
                    ← Back to options
                  </motion.button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  disabled={loading}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  disabled={loading}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  disabled={loading}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  disabled={loading}
                  required
                />
              </div>

              <div className="flex items-start">
                <input type="checkbox" id="terms" className="mt-1 mr-3" disabled={loading} required />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading || success}
                className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
              >
                {loading ? "Creating account..." : success ? "Success! Redirecting..." : "Create Account"}
              </motion.button>
            </form>
              </>
            )}
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
