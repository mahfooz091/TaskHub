"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  { title: "Flexible Work", desc: "Work on your own schedule, anytime, anywhere.", icon: "⏰" },
  { title: "Easy Applications", desc: "Apply to jobs with a single click. No lengthy forms.", icon: "📋" },
  { title: "Instant Payouts", desc: "Get paid ₹5-₹10 per task. Weekly withdrawals available.", icon: "💳" },
  { title: "Track Progress", desc: "Monitor earnings, completed tasks, and skill growth.", icon: "📈" },
  { title: "Quality Assurance", desc: "Work verified by our QA team. Earn bonus for excellence.", icon: "✅" },
  { title: "Community Support", desc: "Connect with 10K+ earners. Get tips and share experiences.", icon: "👥" },
];

export default function FeaturesGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="features" className="py-20 bg-white" aria-label="Platform features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">Why Choose TaskHub</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Simple, transparent, and rewarding work opportunities for everyone</p>
        </div>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              className="bg-linear-to-br from-blue-50 to-purple-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all border border-blue-100"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}