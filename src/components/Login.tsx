import { useState } from "react";
import { motion } from "motion/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Shield, Brain, Lock, Network } from "lucide-react";

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#0A192F] flex">
      {/* Left Panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <AnimatedBackground />
        </div>
        
        <div className="relative z-10 text-center max-w-lg">
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-[#00B4D8] to-[#06D6A0] rounded-2xl flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" fill="currentColor"/>
                </svg>
              </div>
              <motion.div
                className="absolute inset-0 bg-[#00B4D8] rounded-2xl blur-xl"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          <motion.h1
            className="text-white mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to Sentinel
          </motion.h1>
          
          <motion.p
            className="text-[#00B4D8] mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            AI-driven Insider Threat Prevention
          </motion.p>

          <motion.p
            className="text-white/70"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Protect your organization from data exfiltration with real-time, privacy-first AI monitoring.
          </motion.p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center bg-[#102A43] p-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-white mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sentinel.com"
                className="bg-[#0A192F] border-[#00B4D8]/30 text-white placeholder:text-white/40"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-white mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-[#0A192F] border-[#00B4D8]/30 text-white placeholder:text-white/40"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <a href="#" className="text-[#00B4D8] hover:text-[#06D6A0] transition-colors">
                Forgot Password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#00B4D8] to-[#06D6A0] hover:opacity-90 text-white"
            >
              Sign In
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full border-[#00B4D8]/30 text-white hover:bg-[#00B4D8]/10"
              onClick={onLogin}
            >
              Launch Demo
            </Button>
          </form>

          <p className="text-white/40 text-sm text-center mt-8">
            © Sentinel 2025 | Privacy-Preserving AI Security
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function AnimatedBackground() {
  return (
    <svg className="w-full h-full opacity-20" viewBox="0 0 800 800">
      <motion.path
        d="M400 100 L200 200"
        stroke="#00B4D8"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <motion.circle
        cx="400"
        cy="100"
        r="8"
        fill="#00B4D8"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <Shield className="absolute top-1/4 left-1/4 w-12 h-12 text-[#00B4D8]" />
      <Brain className="absolute top-1/3 right-1/3 w-12 h-12 text-[#06D6A0]" />
      <Network className="absolute bottom-1/3 left-1/3 w-12 h-12 text-[#00B4D8]" />
      <Lock className="absolute bottom-1/4 right-1/4 w-12 h-12 text-[#06D6A0]" />
    </svg>
  );
}
