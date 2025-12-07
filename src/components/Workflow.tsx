"use client";
import { motion } from "framer-motion";

const steps = [
  { step: 1, title: "Browse Available Jobs", desc: "View active tasks with clear pay rates and requirements.", icon: "🔍" },
  { step: 2, title: "Apply Instantly", desc: "Click apply and start working immediately.", icon: "✋" },
  { step: 3, title: "Complete & Submit", desc: "Submit your work for quality verification.", icon: "✓" },
  { step: 4, title: "Earn & Withdraw", desc: "Get paid ₹5-₹10 per task. Withdraw weekly.", icon: "💰" },
];

export default function Workflow() {
  return (
    <section id="workflow" className="py-24 bg-linear-to-r from-blue-50 to-purple-50" aria-label="How it works process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">Get Started in 4 Steps</h2>
          <p className="text-xl text-gray-600">From signup to earning in minutes</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border-2 border-blue-100 hover:border-blue-300">
                <div className="text-5xl mb-4">{step.icon}</div>
                <div className="flex items-center justify-center bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-full w-12 h-12 font-bold text-lg mb-4">{step.step}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-1 bg-linear-to-r from-blue-400 to-purple-400 transform -translate-y-1/2"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}