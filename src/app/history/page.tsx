"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { walletAPI, getToken } from "@/lib/api";

interface Transaction {
  id: number;
  type: "credit" | "debit" | "withdrawal";
  amount: number;
  description: string;
  status: "completed" | "pending" | "failed";
  date: string;
  fileName?: string;
  fileSize?: number;
}

export default function HistoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const token = getToken();
        if (!token) {
          router.push("/login");
          return;
        }

        setIsLoggedIn(true);

        // Try to fetch from API, fallback to mock data on failure
        try {
          const txns = await walletAPI.getTransactions?.(50);
          if (Array.isArray(txns)) {
            setTransactions(txns);
          } else {
            setTransactions(getMockTransactions());
          }
        } catch (txErr) {
          console.warn("Failed to fetch transactions, using mock:", txErr);
          setTransactions(getMockTransactions());
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [router]);

  function getMockTransactions(): Transaction[] {
    return [
      {
        id: 1,
        type: "credit",
        amount: 15.5,
        description: "Upload approved — Image Set A",
        status: "completed",
        date: "2025-12-04",
        fileName: "image_a.jpg",
        fileSize: 45.6,
      },
      {
        id: 2,
        type: "withdrawal",
        amount: -200,
        description: "Bank Withdrawal",
        status: "completed",
        date: "2025-11-30",
      },
      {
        id: 3,
        type: "credit",
        amount: 8.0,
        description: "Upload approved — Image Set B",
        status: "pending",
        date: "2025-12-01",
        fileName: "image_b.jpg",
        fileSize: 27.1,
      },
    ];
  }

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
        <main className="min-h-screen flex items-center justify-center py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Upload History</h1>
            <p className="text-gray-600 mb-6">Please log in to view your history.</p>
            <Link href="/login">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">Log in</button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h1 initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-6">
            📋 Upload & Transaction History
          </motion.h1>

          {error && (
            <div className="mb-4 p-3 rounded bg-red-50 border border-red-200 text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {transactions.length === 0 ? (
              <div className="text-center py-12 text-gray-600">No transactions yet.</div>
            ) : (
              transactions.map((t, idx) => (
                <motion.div key={t.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.03 }} className="bg-white rounded-lg shadow p-4 flex items-start gap-4">
                  <div className="text-2xl">
                    {t.type === "credit" ? "✅" : t.type === "withdrawal" ? "🏦" : "❌"}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-gray-900">{t.description}</p>
                        <p className="text-sm text-gray-500">{t.date}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${t.amount > 0 ? "text-green-600" : "text-red-600"}`}>{t.amount > 0 ? "+" : ""}₹{Math.abs(t.amount).toFixed(2)}</p>
                        <p className="text-xs text-gray-500">{t.status}</p>
                      </div>
                    </div>

                    {t.fileName && (
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="font-medium">File:</span> {t.fileName} {t.fileSize ? `• ${t.fileSize} KB` : ""}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <div className="mt-8 text-center">
            <Link href="/upload">
              <button className="px-5 py-2 bg-blue-600 text-white rounded-lg">Upload more data</button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
