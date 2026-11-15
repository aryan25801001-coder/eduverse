"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { motion } from "framer-motion";
import { FiZap, FiMail, FiLock, FiUser, FiArrowRight, FiSun, FiUserPlus } from "react-icons/fi";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "buyer" as "buyer" | "seller" | "both",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { setToken, setUser } = useStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setToken(data.token);
      setUser(data.user);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { value: "buyer", label: "Energy Buyer", desc: "Purchase clean energy" },
    { value: "seller", label: "Solar Seller", desc: "Sell surplus power" },
    { value: "both", label: "Prosumer", desc: "Buy & sell energy" },
  ];

  return (
    <div className="min-h-screen bg-primary relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute top-[30%] left-[10%] w-[300px] h-[300px] bg-neon-purple/5 rounded-full blur-[80px]" />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-neon-cyan/10 border border-neon-cyan/20 mb-5 shadow-[0_0_30px_rgba(0,242,255,0.2)]">
            <FiSun className="w-8 h-8 text-neon-cyan" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">
            <span className="text-white">GRID</span>
            <span className="text-accent neon-glow-green">X</span>
          </h1>
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">
            Join the Energy Revolution
          </p>
        </motion.div>

        {/* Register Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-neon-cyan/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center">
                <FiUserPlus className="text-neon-cyan text-lg" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">Create Account</h2>
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em]">Register your grid node</p>
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

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <FiUser className="text-neon-cyan text-xs" /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white font-medium placeholder-gray-600 focus:border-neon-cyan/50 focus:shadow-[0_0_20px_rgba(0,242,255,0.1)] focus:outline-none transition-all duration-300"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <FiMail className="text-neon-cyan text-xs" /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white font-medium placeholder-gray-600 focus:border-neon-cyan/50 focus:shadow-[0_0_20px_rgba(0,242,255,0.1)] focus:outline-none transition-all duration-300"
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <FiZap className="text-neon-cyan text-xs" /> Role
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {roles.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, role: r.value as any })}
                      className={`p-3 rounded-xl border text-center transition-all duration-300 ${
                        formData.role === r.value
                          ? "bg-accent/10 border-accent/40 shadow-[0_0_15px_rgba(0,255,163,0.1)]"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <p className={`text-[10px] font-black uppercase tracking-wider ${
                        formData.role === r.value ? "text-accent" : "text-gray-400"
                      }`}>{r.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                    <FiLock className="text-neon-cyan text-xs" /> Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white font-medium placeholder-gray-600 focus:border-neon-cyan/50 focus:outline-none transition-all duration-300"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                    Confirm
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white font-medium placeholder-gray-600 focus:border-neon-cyan/50 focus:outline-none transition-all duration-300"
                    placeholder="••••••••"
                    required
                  />
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
                    Creating...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <FiZap className="text-lg" />
                    Join Grid
                    <FiArrowRight />
                  </div>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/5 text-center">
              <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold mb-3">Already on the grid?</p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-xs font-black text-accent hover:text-neon-cyan transition-colors uppercase tracking-widest group"
              >
                Sign In
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
