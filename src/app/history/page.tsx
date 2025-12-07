"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { uploadAPI, getToken } from "@/lib/api";

interface Upload {
  id: number;
  fileName: string;
  fileType: "image" | "video" | "document" | "audio";
  fileSize: number;
  status: "pending_review" | "approved" | "rejected";
  reward: number | null;
  uploadDate: string;
  reviewDate: string | null;
  feedback: string | null;
}

export default function HistoryPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploads, setUploads] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    // Check if user is logged in and load uploads
    const loadUploads = async () => {
      try {
        const token = getToken();
        if (!token) {
          router.push("/login");
          return;
        }

        setIsLoggedIn(true);

        // Fetch uploads from backend
        const uploadsList = await uploadAPI.list(50);
        setUploads(uploadsList);

        // Fetch stats from backend
        const uploadStats = await uploadAPI.getStats();
        setStats(uploadStats);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load uploads");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    loadUploads();
  }, [router]);
      fileSize: 45.6,
      status: "approved",
      reward: 10,
      uploadDate: "2025-12-04",
      reviewDate: "2025-12-04",
      feedback: null,
    },
    {
      id: 41,
      fileName: "blurry_photo.jpg",
      fileType: "image",
      fileSize: 3.2,
      status: "rejected",
      reward: null,
      uploadDate: "2025-12-03",
      reviewDate: "2025-12-04",
      feedback: "Image is out of focus and too small",
    },
    {
      id: 40,
      fileName: "research_paper.pdf",
      fileType: "document",
      fileSize: 8.9,
      status: "pending_review",
      reward: null,
      uploadDate: "2025-12-02",
      reviewDate: null,
      feedback: null,
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  useEffect(() => {
    // Check if user is logged in on component mount
    const checkLogin = () => {
      const user = localStorage.getItem("user");
      return !!user;
    };
    
    setIsLoggedIn(checkLogin());
    setLoading(false);
  }, []);

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "image":
        return "🖼️";
      case "video":
        return "🎥";
      case "document":
        return "📄";
      case "audio":
        return "🎵";
      default:
        return "📎";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300";
      case "pending_review":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return "✅ Approved";
      case "rejected":
        return "❌ Rejected";
      case "pending_review":
        return "⏳ Pending Review";
      default:
        return "❓ Unknown";
    }
  };

  const filteredUploads = uploads.filter((upload) => {
    const statusMatch = filterStatus === "all" || upload.status === filterStatus;
    const typeMatch = filterType === "all" || upload.fileType === filterType;
    return statusMatch && typeMatch;
  });

  const stats = {
    total: uploads.length,
    approved: uploads.filter((u) => u.status === "approved").length,
    rejected: uploads.filter((u) => u.status === "rejected").length,
    pending: uploads.filter((u) => u.status === "pending_review").length,
    totalEarned: uploads
      .filter((u) => u.reward)
      .reduce((sum, u) => sum + (u.reward || 0), 0),
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin text-4xl">⏳</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!isLoggedIn) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 flex items-center justify-center py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              📋 Upload History
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Please log in to view your uploads
            </p>
            <div className="space-x-4">
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold"
                >
                  Log In
                </motion.button>
              </Link>
              <Link href="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-purple-600 text-white px-8 py-3 rounded-lg font-bold"
                >
                  Sign Up
                </motion.button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              📋 Upload History
            </h1>
            <p className="text-xl text-gray-600">
              Track all your uploads and their review status
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12"
          >
            {[
              { label: "Total Uploads", value: stats.total, icon: "📤", color: "blue" },
              { label: "Approved", value: stats.approved, icon: "✅", color: "green" },
              { label: "Rejected", value: stats.rejected, icon: "❌", color: "red" },
              { label: "Pending", value: stats.pending, icon: "⏳", color: "yellow" },
              { label: "Earned", value: `₹${stats.totalEarned}`, icon: "💰", color: "purple" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-${stat.color}-50 rounded-xl shadow-lg p-4 border-l-4 border-${stat.color}-500`}
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">🔍 Filter</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="approved">✅ Approved</option>
                  <option value="rejected">❌ Rejected</option>
                  <option value="pending_review">⏳ Pending Review</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  File Type
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="image">🖼️ Images</option>
                  <option value="video">🎥 Videos</option>
                  <option value="document">📄 Documents</option>
                  <option value="audio">🎵 Audio</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Uploads List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {filteredUploads.length > 0 ? (
              filteredUploads.map((upload, idx) => (
                <motion.div
                  key={upload.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    {/* File Info */}
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="text-4xl shrink-0">
                        {getFileIcon(upload.fileType)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-lg wrap-break-word">
                          {upload.fileName}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            📁 {upload.fileSize}MB
                          </span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            📤 {upload.uploadDate}
                          </span>
                          {upload.reviewDate && (
                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                              ✓ {upload.reviewDate}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Status & Reward */}
                    <div className="flex flex-col items-end gap-3 shrink-0">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className={`px-4 py-2 rounded-lg text-sm font-bold border ${getStatusColor(
                          upload.status
                        )}`}
                      >
                        {getStatusBadge(upload.status)}
                      </motion.span>
                      {upload.reward && (
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">
                            +₹{upload.reward}
                          </p>
                          <p className="text-xs text-gray-600">Earned</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Feedback */}
                  {upload.feedback && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`mt-4 p-3 rounded-lg border-l-4 ${
                        upload.status === "rejected"
                          ? "bg-red-50 border-red-500"
                          : "bg-green-50 border-green-500"
                      }`}
                    >
                      <p className="text-sm font-bold text-gray-900">
                        {upload.status === "rejected" ? "❌ Feedback:" : "✅ Feedback:"}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">{upload.feedback}</p>
                    </motion.div>
                  )}

                  {/* Re-upload Button */}
                  {upload.status === "rejected" && (
                    <Link href="/upload">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 text-sm"
                      >
                        🔄 Re-upload Improved File
                      </motion.button>
                    </Link>
                  )}
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-lg p-12 text-center"
              >
                <p className="text-4xl mb-4">📭</p>
                <p className="text-xl font-bold text-gray-900">
                  No uploads found
                </p>
                <p className="text-gray-600 mt-2">
                  Start uploading quality data to earn rewards!
                </p>
                <Link href="/upload">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
                  >
                    📤 Upload Now
                  </motion.button>
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 bg-blue-50 border-2 border-blue-200 rounded-xl p-8"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              💡 Tips for Better Approvals
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "✅ Follow quality guidelines before uploading",
                "✅ Use high resolution for images and videos",
                "✅ Add descriptive titles and metadata",
                "✅ Ensure proper lighting and clarity",
                "✅ Verify files are not corrupted",
                "✅ Check that content is original or properly licensed",
              ].map((tip, idx) => (
                <p key={idx} className="text-gray-700">
                  {tip}
                </p>
              ))}
            </ul>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
