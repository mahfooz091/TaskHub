"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-20 bg-linear-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Complete Tasks, Earn Rewards</h1>
          <p className="text-xl mb-8">Upload annotations, complete micro-tasks, and earn ₹5 to ₹10 per validated task. Get started in seconds.</p>
          <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
            <Link href="/signup" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 text-center">Get Started</Link>
            <Link href="/upload" className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 text-center">Upload Now</Link>
            <Link href="/kanban" className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 text-center">View Kanban</Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-1/2 mt-10 md:mt-0"
        >
          <Image src="/images/laptop-mockup.png" alt="TaskHub Dashboard showing task management and earning interface" width={600} height={400} className="rounded-lg shadow-lg object-cover" />
        </motion.div>
      </div>
    </section>
  );
}