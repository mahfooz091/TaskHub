"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { uploadAPI, getToken } from "@/lib/api";

export default function Upload() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    // Check if user is authenticated
    if (!getToken()) {
      router.push("/login");
    }
  }, [router]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      setUploadError("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError("Please select a file");
      return;
    }

    setUploading(true);
    setUploadError("");

    try {
      const response = await uploadAPI.create(selectedFile, description);
      setUploadSuccess(true);
      setSelectedFile(null);
      setDescription("");

      // Redirect to history after 2 seconds
      setTimeout(() => {
        router.push("/history");
      }, 2000);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-blue-500 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Upload Content</h1>
            <p className="text-xl text-blue-100">Upload your work and get verified for payment</p>
          </motion.div>

          {/* Upload Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl p-6 md:p-12 mb-8"
          >
            {/* Drag and Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-4 border-dashed rounded-xl p-6 md:p-12 text-center transition-all cursor-pointer ${
                isDragging
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300 bg-gray-50 hover:border-blue-400"
              }`}
            >
              <div className="text-5xl mb-4">📁</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Drag & Drop Your File</h3>
              <p className="text-gray-600 mb-4">or click to browse</p>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-input"
              />
              <label htmlFor="file-input" className="inline-block">
                <button
                  onClick={() => document.getElementById("file-input")?.click()}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Browse Files
                </button>
              </label>
            </div>

            {/* Selected File Display */}
            {selectedFile && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg"
              >
                <p className="text-green-700 font-semibold">✓ File selected: {selectedFile.name}</p>
                <p className="text-green-600 text-sm">Size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
              </motion.div>
            )}

            {/* Upload Details */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Upload Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Task Type</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    <option>Data Annotation</option>
                    <option>Image Labeling</option>
                    <option>Text Classification</option>
                    <option>Content Review</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    <option>General</option>
                    <option>Image Processing</option>
                    <option>Text Analysis</option>
                    <option>Audio Transcription</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Describe your submission..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                ></textarea>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4">
              <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={!selectedFile}>
                Submit Upload
              </button>
              <Link href="/" className="flex-1">
                <button className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20"
            >
              <div className="text-3xl mb-3">💰</div>
              <h4 className="font-semibold mb-2">Earn ₹5-₹10</h4>
              <p className="text-sm text-blue-100">Per verified submission</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20"
            >
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-semibold mb-2">Quick Approval</h4>
              <p className="text-sm text-blue-100">Within 24 hours</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20"
            >
              <div className="text-3xl mb-3">🎁</div>
              <h4 className="font-semibold mb-2">Bonus Rewards</h4>
              <p className="text-sm text-blue-100">For quality submissions</p>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
