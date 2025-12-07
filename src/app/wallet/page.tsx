"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { walletAPI, getToken } from "@/lib/api";

interface Transaction {
  id: number;
  type: "credit" | "debit" | "withdrawal";
  amount: number;
  description: string;
  status: "completed" | "pending" | "failed";
  date: string;
}

export default function WalletPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [walletBalance, setWalletBalance] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [totalWithdrawn, setTotalWithdrawn] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState("");
  const [withdrawing, setWithdrawing] = useState(false);

  useEffect(() => {
    const loadWallet = async () => {
      try {
        const token = getToken();
        if (!token) {
          router.push("/login");
          return;
        }

        setIsLoggedIn(true);

        // Fetch wallet data
        const wallet = await walletAPI.get();
        if (wallet) {
          setWalletBalance(Number(wallet.current_balance ?? 0));
          setTotalEarned(Number(wallet.total_earned ?? 0));
          setTotalWithdrawn(Number(wallet.total_withdrawn ?? 0));
        }

        // Fetch recent transactions
        try {
          const txns = await walletAPI.getTransactions(20);
          if (Array.isArray(txns)) setTransactions(txns);
        } catch (txErr) {
          console.warn("Failed to fetch transactions:", txErr);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load wallet");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    loadWallet();
  }, [router]);

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0 || amount > walletBalance) {
      alert("Invalid withdrawal amount");
      return;
    }

    const newTransaction: Transaction = {
      id: transactions.length + 1,
      type: "withdrawal",
      amount: -amount,
      description: "Bank Withdrawal Request",
      status: "pending",
      date: new Date().toISOString().split("T")[0],
    };

    setTransactions([newTransaction, ...transactions]);
    setWalletBalance((prev) => prev - amount);
    setTotalWithdrawn((prev) => prev + amount);
    setWithdrawAmount("");
    setShowWithdrawModal(false);
    alert("Withdrawal request submitted! You'll receive the amount within 2-3 business days.");
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">💳 Wallet</h1>
            <p className="text-xl text-gray-600 mb-8">Please log in to view your wallet</p>
            <div className="space-x-4">
              <Link href="/login">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold">Log In</motion.button>
              </Link>
              <Link href="/signup">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-purple-600 text-white px-8 py-3 rounded-lg font-bold">Sign Up</motion.button>
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
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">💳 My Wallet</h1>
            <p className="text-xl text-gray-600">Track your earnings and manage withdrawals</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-linear-to-br from-blue-600 to-purple-700 text-white rounded-3xl shadow-2xl p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div whileHover={{ scale: 1.05 }} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <p className="text-blue-100 text-sm mb-2">💰 Current Balance</p>
                <p className="text-4xl font-bold mb-4">₹{walletBalance.toFixed(2)}</p>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(walletBalance / 500) * 100}%` }} transition={{ duration: 1 }} className="h-full bg-linear-to-r from-green-400 to-blue-400" />
                </div>
                <p className="text-xs text-blue-100 mt-2">Level: Silver (₹{(500 - walletBalance).toFixed(2)} to Gold)</p>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <p className="text-blue-100 text-sm mb-2">📈 Total Earned</p>
                <p className="text-4xl font-bold mb-4">₹{totalEarned.toFixed(2)}</p>
                <p className="text-green-200 text-sm">+24 uploads approved</p>
                <p className="text-blue-100 text-xs mt-2">From quality data uploads</p>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <p className="text-blue-100 text-sm mb-2">🏦 Total Withdrawn</p>
                <p className="text-4xl font-bold mb-4">₹{totalWithdrawn.toFixed(2)}</p>
                <p className="text-blue-200 text-sm">2 withdrawal requests</p>
                <p className="text-blue-100 text-xs mt-2">Successfully processed</p>
              </motion.div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowWithdrawModal(true)} className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold transition-all">🏦 Withdraw to Bank</motion.button>
              <Link href="/upload"><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-blue-400 hover:bg-blue-300 text-white px-8 py-3 rounded-lg font-bold transition-all">📤 Upload More Data</motion.button></Link>
              <Link href="/history"><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-purple-400 hover:bg-purple-300 text-white px-8 py-3 rounded-lg font-bold transition-all">📋 Upload History</motion.button></Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Transaction History</h2>
            <div className="space-y-4">
              {transactions.map((transaction, idx) => (
                <motion.div key={transaction.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} className={`flex items-center justify-between p-4 rounded-lg border-l-4 ${transaction.type === "credit" ? "bg-green-50 border-green-500" : transaction.type === "withdrawal" ? "bg-blue-50 border-blue-500" : "bg-red-50 border-red-500"}`}>
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-2xl">{transaction.type === "credit" ? "✅" : transaction.type === "withdrawal" ? "🏦" : "❌"}</div>
                    <div>
                      <p className="font-bold text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-600">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-bold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>{transaction.amount > 0 ? "+" : ""}₹{Math.abs(transaction.amount).toFixed(2)}</p>
                    <p className={`text-xs font-semibold ${transaction.status === "completed" ? "text-green-600" : transaction.status === "pending" ? "text-yellow-600" : "text-red-600"}`}>{transaction.status === "completed" ? "✓ Completed" : transaction.status === "pending" ? "⏳ Pending" : "✗ Failed"}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <Footer />
        </div>
      </main>
    </>
  );
}
