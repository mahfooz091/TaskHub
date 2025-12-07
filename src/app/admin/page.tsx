"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { reviewAPI, getToken } from "@/lib/api";

interface PendingUpload {
  id: number;
  fileName: string;
  fileType: "image" | "video" | "document" | "audio";
  fileSize: number;
  uploader: string;
  uploadedDate: string;
  preview: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedUpload, setSelectedUpload] = useState<PendingUpload | null>(null);
  const [reviewComment, setReviewComment] = useState("");
  const [qualityScore, setQualityScore] = useState(50);
  const [rejectionReason, setRejectionReason] = useState("");
  const [pendingUploads, setPendingUploads] = useState<PendingUpload[]>([]);
  const [reviewing, setReviewing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check admin status and load pending uploads
    const checkAdminAndLoad = async () => {
      try {
        const token = getToken();
        if (!token) {
          router.push("/login");
          return;
        }

        const user = localStorage.getItem("user");
        const userObj = user ? JSON.parse(user) : null;
        
        if (userObj?.role !== "admin") {
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        setIsAdmin(true);

        // Fetch pending uploads from backend
        const uploads = (await reviewAPI.getPending(10)) as PendingUpload[];
        setPendingUploads(uploads);
        if (uploads.length > 0) {
          setSelectedUpload(uploads[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load uploads");
      } finally {
        setLoading(false);
      }
    };
    
    checkAdminAndLoad();
  }, [router]);

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

  if (!isAdmin) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 flex items-center justify-center py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">🔐 Access Denied</h1>
            <p className="text-xl text-gray-600 mb-8">
              Admin access only. Please contact support if you need access.
            </p>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold"
              >
                ← Back to Home
              </motion.button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleApprove = async () => {
    if (!selectedUpload) return;

    setReviewing(true);
    try {
      await reviewAPI.approve(selectedUpload.id, qualityScore, reviewComment, 10);

      // Remove from pending list (use current state to derive new list)
      const newList = pendingUploads.filter((u) => u.id !== selectedUpload.id);
      setPendingUploads(newList);
      setSelectedUpload(newList[0] || null);
      setReviewComment("");
      setQualityScore(50);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to approve");
    } finally {
      setReviewing(false);
    }
  };

  const handleReject = async () => {
    if (!selectedUpload || !rejectionReason) {
      setError("Please select a rejection reason");
      return;
    }
    
    setReviewing(true);
    try {
      await reviewAPI.reject(selectedUpload.id, rejectionReason, reviewComment);

      // Remove from pending list and select next if available
      const newList = pendingUploads.filter((u) => u.id !== selectedUpload.id);
      setPendingUploads(newList);
      setSelectedUpload(newList[0] || null);
      setReviewComment("");
      setRejectionReason("");
      setQualityScore(50);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reject");
    } finally {
      setReviewing(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-red-50 via-white to-orange-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold bg-linear-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
              🛡️ Admin Review Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              Review and approve/reject pending uploads
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12"
          >
            {[
              { label: "Pending Review", value: pendingUploads.length, icon: "⏳" },
              { label: "Today Reviewed", value: "12", icon: "✅" },
              { label: "Approval Rate", value: "89%", icon: "📊" },
              { label: "Avg Review Time", value: "15min", icon: "⏱️" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl shadow-lg p-4 border-t-4 border-red-500"
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Pending Uploads List */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                📋 Pending ({pendingUploads.length})
              </h2>

              <div className="space-y-3">
                {pendingUploads.map((upload, idx) => (
                  <motion.button
                    key={upload.id}
                    onClick={() => setSelectedUpload(upload)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedUpload?.id === upload.id
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 bg-gray-50 hover:border-red-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{upload.preview}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 truncate">
                          #{upload.id}
                        </p>
                        <p className="text-xs text-gray-600 truncate">
                          {upload.fileName}
                        </p>
                        <p className="text-xs text-gray-500">
                          @{upload.uploader}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {pendingUploads.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 text-gray-500"
                >
                  <p className="text-3xl mb-2">✅</p>
                  <p className="font-bold">All caught up!</p>
                  <p className="text-sm">No pending uploads to review</p>
                </motion.div>
              )}
            </motion.div>

            {/* Review Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              {selectedUpload ? (
                <motion.div
                  key={selectedUpload.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  {/* File Preview */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-2xl shadow-lg p-8 text-center"
                  >
                    <div className="text-9xl mb-4">{selectedUpload.preview}</div>
                    <p className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedUpload.fileName}
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 text-sm">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                        {selectedUpload.fileType}
                      </span>
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                        {selectedUpload.fileSize}MB
                      </span>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                        ID: {selectedUpload.id}
                      </span>
                    </div>
                  </motion.div>

                  {/* Upload Details */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-2xl shadow-lg p-8"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      📝 Upload Details
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Uploaded By</p>
                          <p className="font-bold text-gray-900">
                            @{selectedUpload.uploader}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Upload Date</p>
                          <p className="font-bold text-gray-900">
                            {selectedUpload.uploadedDate}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">File Type</p>
                          <p className="font-bold text-gray-900">
                            {selectedUpload.fileType.toUpperCase()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">File Size</p>
                          <p className="font-bold text-gray-900">
                            {selectedUpload.fileSize}MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Review Form */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-2xl shadow-lg p-8"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      ✍️ Review
                    </h3>

                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          📋 Comments (Optional)
                        </label>
                        <textarea
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          placeholder="Add positive feedback or notes..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-20"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          ⭐ Quality Score
                        </label>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={qualityScore}
                            onChange={(e) => setQualityScore(Number(e.target.value))}
                            className="w-full"
                          />
                        <p className="text-xs text-gray-600 mt-1">
                          Drag to rate quality (0-100)
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleApprove}
                        className="w-full bg-linear-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all"
                      >
                        ✅ Approve & Credit ₹10
                      </motion.button>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          ⛔ Rejection Reason
                        </label>
                        <select
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-3"
                        >
                          <option value="">Select reason to reject...</option>
                          <option value="low_quality">Low Quality/Blurry</option>
                          <option value="copyrighted">Copyrighted Content</option>
                          <option value="inappropriate">
                            Inappropriate Content
                          </option>
                          <option value="corrupted">Corrupted File</option>
                          <option value="duplicate">Duplicate Upload</option>
                          <option value="wrong_category">Wrong Category</option>
                          <option value="other">Other</option>
                        </select>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleReject}
                          disabled={!rejectionReason}
                          className="w-full bg-linear-to-r from-red-500 to-orange-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          ❌ Reject & Notify User
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl shadow-lg p-16 text-center"
                >
                  <p className="text-5xl mb-4">📂</p>
                  <p className="text-2xl font-bold text-gray-900">
                    Select an upload to review
                  </p>
                  <p className="text-gray-600 mt-2">
                    Click on any pending upload from the list to start reviewing
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Guidelines for Reviewers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 bg-blue-50 border-2 border-blue-200 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              📋 Review Guidelines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "✅ Approve When",
                  items: [
                    "File quality meets or exceeds standards",
                    "Content is original and properly licensed",
                    "File is properly formatted and readable",
                    "No copyright or trademark violations",
                    "Content is appropriate and relevant",
                  ],
                },
                {
                  title: "❌ Reject When",
                  items: [
                    "File is corrupted or unreadable",
                    "Quality is significantly below standards",
                    "Content appears to be copied/plagiarized",
                    "Contains inappropriate or explicit material",
                    "File type doesn't match category",
                  ],
                },
              ].map((section, idx) => (
                <div key={idx}>
                  <h4 className="font-bold text-gray-900 mb-3">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex gap-2 text-gray-700">
                        <span className="text-blue-500">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
