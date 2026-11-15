"use client";

import React, { useState } from "react";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiZap, FiMail, FiLock, FiArrowRight, FiSun, FiShield } from "react-icons/fi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { setToken, setUser } = useStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Call real backend API route
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      setToken(data.token);
      setUser(data.user);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-neon-purple/5 rounded-full blur-[80px]" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 mb-5 shadow-[0_0_30px_rgba(0,255,163,0.2)]">
            <FiSun className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">
            <span className="text-white">GRID</span>
            <span className="text-accent neon-glow-green">X</span>
          </h1>
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">
            Decentralized AI Energy Trading
          </p>
        </motion.div>

        {/* Login Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Card Glow Effect */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-neon-cyan/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <FiShield className="text-accent text-lg" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">Welcome Back</h2>
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em]">Authenticate to continue</p>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-neon-red/10 border border-neon-red/30 rounded-2xl p-4 mb-6 flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-neon-red shadow-[0_0_8px_rgba(255,0,85,1)]" />
                <p className="text-xs font-bold text-neon-red">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <FiMail className="text-accent text-xs" /> Email Address
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white font-medium placeholder-gray-600 focus:border-accent/50 focus:shadow-[0_0_20px_rgba(0,255,163,0.1)] focus:outline-none transition-all duration-300"
                    placeholder="your@email.com"
                    required
                  />
                  <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent w-0 group-focus-within:w-full transition-all duration-500" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <FiLock className="text-accent text-xs" /> Password
                </label>
                <div className="relative group">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white font-medium placeholder-gray-600 focus:border-accent/50 focus:shadow-[0_0_20px_rgba(0,255,163,0.1)] focus:outline-none transition-all duration-300"
                    placeholder="••••••••"
                    required
                  />
                  <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent w-0 group-focus-within:w-full transition-all duration-500" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl font-black transition-all duration-500 uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-3 active:scale-95 mt-2 bg-accent text-black hover:shadow-[0_0_40px_rgba(0,255,163,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Authenticating...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <FiZap className="text-lg" />
                    Access Grid
                    <FiArrowRight />
                  </div>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold mb-3">New to the grid?</p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 text-xs font-black text-accent hover:text-neon-cyan transition-colors uppercase tracking-widest group"
              >
                Create Account
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-white/5 backdrop-blur-sm border border-neon-yellow/20 rounded-2xl p-5 text-center"
        >
          <p className="text-[9px] text-gray-500 uppercase tracking-[0.3em] font-black mb-2">Demo Credentials</p>
          <p className="text-xs text-neon-yellow font-mono font-bold">
            arjun@solargrid.in / password123
          </p>
        </motion.div>
      </div>
    </div>
  );
}
