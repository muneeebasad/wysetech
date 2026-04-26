"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch {
      setError("Connection error. Check that the dev server is running.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Aurora */}
      <motion.div
        className="absolute w-[60vw] h-[60vw] max-w-[700px] rounded-full blur-[120px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(26,79,138,0.22) 0%, transparent 70%)",
          top: "-20%", left: "-10%",
        }}
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[40vw] h-[40vw] max-w-[500px] rounded-full blur-[100px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(15,110,86,0.16) 0%, transparent 70%)",
          bottom: "-10%", right: "-8%",
        }}
        animate={{ x: [0, -25, 0], y: [0, -20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.34, 1.2, 0.64, 1] }}
        className="w-full max-w-md relative"
      >
        {/* Card */}
        <div
          className="rounded-2xl border border-[#21262D] p-8 relative overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #161B22, #0F1923)",
            boxShadow: "0 0 60px rgba(26,79,138,0.14)",
          }}
        >
          {/* Top accent */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: "linear-gradient(90deg, transparent, #2563EB, #0F6E56, transparent)" }}
          />

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
              style={{
                background: "linear-gradient(135deg, #1A4F8A, #2563EB)",
                boxShadow: "0 0 28px rgba(37,99,235,0.4)",
              }}
            >
              <Shield size={26} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-[#E6EDF3]">Wysetech CMS</h1>
            <p className="text-sm text-[#8B949E] mt-1">Sign in to manage content</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-[#8B949E] mb-2">
                Admin Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B949E]" />
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                  placeholder="Enter password"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#21262D] bg-[#0D1117]
                             text-[#E6EDF3] text-sm placeholder-[#8B949E]/40
                             focus:outline-none focus:border-[#2563EB] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8B949E] hover:text-[#E6EDF3] transition-colors"
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 rounded-lg bg-[#A32D2D]/10 border border-[#A32D2D]/30 text-[#F87171] text-sm"
              >
                <AlertCircle size={14} className="shrink-0" />
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={loading || !password}
              className="w-full btn-shimmer py-3.5 rounded-xl text-white font-bold text-sm
                         disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ boxShadow: "0 4px 24px rgba(37,99,235,0.4)" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              {loading ? "Signing in…" : "Sign In"}
            </motion.button>
          </form>

          <p className="text-center text-xs text-[#8B949E]/50 mt-6">
            Default password is set in <code className="text-[#8B949E]">.env.local</code>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
