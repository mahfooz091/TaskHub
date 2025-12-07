"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Jobs", href: "/upload" },
    { name: "Kanban", href: "/kanban" },
    { name: "Done ✅", href: "/done" },
    { name: "Guidelines", href: "/guidelines" },
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#workflow" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-blue-600 focus:text-white focus:rounded">Skip to main content</a>
      <nav className="bg-linear-to-r from-white to-blue-50 shadow-lg sticky top-0 z-50 border-b border-blue-100" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 min-w-0">
            <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg shrink-0">T</div>
            <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate hidden sm:inline-block">TaskHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/admin"
              className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-medium transition-colors"
              title="Admin Dashboard"
            >
              Admin
            </Link>
            <Link
              href="/login"
              className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-medium transition-colors border border-gray-300 hover:border-blue-600"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all hover:scale-105"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 border-t border-blue-100"
          >
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2 border-t border-blue-100">
                <Link
                  href="/admin"
                  className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg font-medium transition-colors text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Admin
                </Link>
                <Link
                  href="/login"
                  className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg font-medium transition-colors border border-gray-300 text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="block bg-linear-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-lg font-medium text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
            </motion.div>
        )}
      </div>
    </nav>
    </>
  );
}