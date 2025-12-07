"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { authService } from "@/lib/auth";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        router.push("/login");
        return;
      }
      setUser(currentUser);
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    authService.logout();
    router.push("/");
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-5xl font-extrabold text-gray-900 mb-2">
                  Welcome back, <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{user?.name}</span>
                </h1>
                <p className="text-xl text-gray-600">{user?.email}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Logout
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { label: "Tasks Completed", value: "0", icon: "✓" },
              { label: "Earnings Per Task", value: "₹5-₹10", icon: "💰" },
              { label: "Account Status", value: "Active", icon: "🎉" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 border border-blue-100"
              >
                <div className="text-5xl mb-4">{stat.icon}</div>
                <p className="text-gray-600 text-sm font-semibold mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-blue-100 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/upload"
                className="p-6 bg-linear-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition text-center"
              >
                <div className="text-4xl mb-3">📤</div>
                <h3 className="font-semibold text-lg text-gray-900">Upload Task</h3>
                <p className="text-sm text-gray-600 mt-1">Start earning by uploading tasks</p>
              </Link>
              <Link
                href="/tasks"
                className="p-6 bg-linear-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition text-center"
              >
                <div className="text-4xl mb-3">📋</div>
                <h3 className="font-semibold text-lg text-gray-900">View Tasks</h3>
                <p className="text-sm text-gray-600 mt-1">Browse and complete available tasks</p>
              </Link>
            </div>
          </motion.div>

          {/* Profile Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-blue-100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={user?.name || ""}
                  readOnly
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-700"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                Update Profile
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
