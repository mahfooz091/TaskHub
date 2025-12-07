"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GuidelinesPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const guidelines = [
    {
      id: "images",
      title: "📸 Image Quality Guidelines",
      icon: "🖼️",
      criteria: [
        "Resolution: Minimum 1920x1080 pixels (1080p)",
        "Format: JPG, PNG, WEBP accepted",
        "File size: 5-50MB",
        "Clarity: Sharp, well-focused, no blurriness",
        "Lighting: Proper exposure, no glare",
        "Composition: Well-framed, subject clear",
        "Uniqueness: Original content, not duplicated",
        "Copyright: Properly licensed or owned by uploader",
      ],
      examples: "✅ High-resolution product photos, landscapes, documents",
      rejection_reasons: [
        "❌ Blurry or low resolution",
        "❌ Copyrighted material without permission",
        "❌ Inappropriate or explicit content",
        "❌ Watermarked by other sources",
      ],
    },
    {
      id: "videos",
      title: "🎥 Video Quality Guidelines",
      icon: "📹",
      criteria: [
        "Resolution: Minimum 1080p (1920x1080)",
        "Format: MP4, WebM, MOV accepted",
        "File size: 50-500MB",
        "Duration: 10 seconds to 10 minutes",
        "Frame rate: 24fps or higher",
        "Audio: Clear, properly balanced",
        "Uniqueness: Original, not repurposed",
        "No watermarks or branding",
      ],
      examples: "✅ Tutorial videos, nature footage, demonstrations",
      rejection_reasons: [
        "❌ Low resolution or poor quality",
        "❌ Unstable/shaky footage",
        "❌ Contains copyrighted audio/music",
        "❌ Inappropriate content",
      ],
    },
    {
      id: "documents",
      title: "📄 Document Quality Guidelines",
      icon: "📋",
      criteria: [
        "Format: PDF, DOCX, XLSX, CSV accepted",
        "File size: 1-50MB",
        "Clarity: Readable text, good contrast",
        "Structure: Well-organized, proper formatting",
        "Content: Accurate, factual information",
        "Completeness: Full document, no partial content",
        "Language: Clear, proper grammar",
        "Uniqueness: Original research or compilation",
      ],
      examples: "✅ Research papers, datasets, reports, guides",
      rejection_reasons: [
        "❌ Corrupted or unreadable files",
        "❌ Plagiarized content",
        "❌ Personal/confidential information",
        "❌ Incomplete or malformed documents",
      ],
    },
    {
      id: "audio",
      title: "🎵 Audio Quality Guidelines",
      icon: "🔊",
      criteria: [
        "Format: MP3, WAV, FLAC, OGG accepted",
        "File size: 5-100MB",
        "Duration: 10 seconds to 1 hour",
        "Bitrate: 128kbps minimum (256kbps recommended)",
        "Clarity: No distortion, clear sound",
        "Uniqueness: Original recordings",
        "Licensing: Properly licensed or owned",
        "Metadata: Title, artist, description provided",
      ],
      examples: "✅ Podcasts, music, narrations, ambient sounds",
      rejection_reasons: [
        "❌ Poor audio quality or distortion",
        "❌ Copyrighted music without permission",
        "❌ Too much background noise",
        "❌ Incompatible format",
      ],
    },
  ];

  const generalGuidelines = [
    {
      title: "Content Standards",
      items: [
        "✅ Original or properly licensed content",
        "✅ Relevant and useful data",
        "✅ No personal/sensitive information",
        "✅ No hate speech or discrimination",
        "✅ No spam or misleading content",
      ],
    },
    {
      title: "File Requirements",
      items: [
        "✅ Files must not be corrupted",
        "✅ No executable files (.exe, .sh, etc.)",
        "✅ No compressed archives (.zip, .rar)",
        "✅ Proper file naming (descriptive)",
        "✅ No malware or suspicious content",
      ],
    },
    {
      title: "Upload Best Practices",
      items: [
        "✅ Provide accurate descriptions",
        "✅ Add relevant tags/categories",
        "✅ Include metadata when available",
        "✅ Test files before uploading",
        "✅ One file per upload for clarity",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

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
              📋 Quality Guidelines
            </h1>
            <p className="text-2xl text-gray-600">
              Ensure your uploads meet our quality standards for approval
            </p>
          </motion.div>

          {/* Quick Overview Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            {[
              { label: "Approval Rate", value: "85%", icon: "✅" },
              { label: "Avg Review Time", value: "2h", icon: "⏱️" },
              { label: "Quality Score", value: "8.5/10", icon: "⭐" },
              { label: "Support", value: "24/7", icon: "💬" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-blue-500"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Category Guidelines */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 mb-12"
          >
            {guidelines.map((category) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <button
                  onClick={() =>
                    setExpandedCategory(
                      expandedCategory === category.id ? null : category.id
                    )
                  }
                  className="w-full text-left"
                >
                  <div className="bg-linear-to-r from-blue-500 to-purple-600 text-white p-6 flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{category.icon}</span>
                      <div>
                        <h3 className="text-2xl font-bold">{category.title}</h3>
                      </div>
                    </div>
                    <motion.span
                      animate={{
                        rotate:
                          expandedCategory === category.id ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-2xl"
                    >
                      ▼
                    </motion.span>
                  </div>
                </button>

                {expandedCategory === category.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-gray-50 border-t border-gray-200"
                  >
                    <div className="p-8 space-y-6">
                      {/* Criteria */}
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-4">
                          ✅ Quality Criteria
                        </h4>
                        <ul className="space-y-2">
                          {category.criteria.map((criterion, idx) => (
                            <li
                              key={idx}
                              className="flex gap-3 text-gray-700 p-2 rounded hover:bg-blue-50 transition"
                            >
                              <span className="text-blue-500 font-bold">→</span>
                              <span>{criterion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Examples */}
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                        <p className="font-bold text-gray-900 mb-2">
                          📌 Examples of Accepted Content:
                        </p>
                        <p className="text-gray-700">{category.examples}</p>
                      </div>

                      {/* Rejection Reasons */}
                      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                        <p className="font-bold text-gray-900 mb-3">
                          ⛔ Common Rejection Reasons:
                        </p>
                        <ul className="space-y-2">
                          {category.rejection_reasons.map((reason, idx) => (
                            <li key={idx} className="text-gray-700">
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* General Guidelines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6 mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              🎯 General Guidelines
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {generalGuidelines.map((section, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-blue-500"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex gap-3 text-gray-700">
                        <span className="text-green-500 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Reward Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-xl p-8 text-center mb-12"
          >
            <h3 className="text-3xl font-bold mb-4">💰 Reward Structure</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Standard Upload",
                  amount: "₹5",
                  desc: "Basic quality files",
                },
                {
                  title: "Premium Quality",
                  amount: "₹10",
                  desc: "Exceptional quality content",
                },
                {
                  title: "Bonus",
                  amount: "₹15+",
                  desc: "Top uploads of the month",
                },
              ].map((reward, idx) => (
                <div key={idx} className="bg-white/20 backdrop-blur p-4 rounded-lg">
                  <p className="text-sm text-white/80">{reward.title}</p>
                  <p className="text-4xl font-bold my-2">{reward.amount}</p>
                  <p className="text-sm text-white/70">{reward.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-200"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              ❓ Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {[
                {
                  q: "How long does review take?",
                  a: "Most uploads are reviewed within 2-24 hours. Premium members may get priority review.",
                },
                {
                  q: "Can I re-upload rejected files?",
                  a: "Yes! You'll receive specific feedback on why your upload was rejected and can improve and re-upload.",
                },
                {
                  q: "How do I get paid?",
                  a: "Once approved, rewards are credited to your wallet immediately. Withdraw anytime via bank transfer.",
                },
                {
                  q: "What if my file is too large?",
                  a: "Use compression tools to reduce file size while maintaining quality. We support files up to specified limits.",
                },
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-lg border-l-4 border-blue-500"
                >
                  <p className="font-bold text-gray-900 mb-2">{faq.q}</p>
                  <p className="text-gray-700">{faq.a}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <a href="/upload">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all"
              >
                🚀 Start Uploading Now
              </motion.button>
            </a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
