import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-linear-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">TaskHub</h3>
            <p className="text-gray-300">Complete tasks and earn rewards. Secure micro-task platform.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/upload" className="text-gray-300 hover:text-blue-300 transition block">Upload</Link>
              <Link href="/signup" className="text-gray-300 hover:text-blue-300 transition block">Sign Up</Link>
              <Link href="/done" className="text-gray-300 hover:text-blue-300 transition block">Project Checklist</Link>
              <Link href="/implementation" className="text-gray-300 hover:text-blue-300 transition block">Implementation Guide</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-lg">Legal</h4>
            <div className="space-y-2">
              <Link href="/terms" className="text-gray-300 hover:text-blue-300 transition block">Terms</Link>
              <Link href="/privacy" className="text-gray-300 hover:text-blue-300 transition block">Privacy</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2025 TaskHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}