import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Truck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  MapPinned,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const features = [
  {
    icon: MapPinned,
    title: "Live Fleet Tracking",
    desc: "Monitor every vehicle in real time",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    desc: "Cost, efficiency & performance insights",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    desc: "Enterprise-grade data protection",
  },
];

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Dummy auth — replace with real API call later
    setTimeout(() => {
      navigate("/dashboard");
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left — Branding */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between p-12 border-r border-slate-800/60">
        {/* Glow blobs */}
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30">
            <Truck className="text-white" size={24} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">FleetFlow</h1>
            <p className="text-xs text-slate-400">Smart Logistics Platform</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 space-y-8"
        >
          <h2 className="text-4xl font-bold text-white leading-tight">
            Manage your entire fleet
            <br />
            <span className="text-emerald-400">from one dashboard.</span>
          </h2>

          <div className="space-y-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <Icon size={20} className="text-emerald-400" />
                  </div>

                  <div>
                    <p className="text-white font-medium">{f.title}</p>
                    <p className="text-slate-400 text-sm">{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative z-10 text-slate-500 text-sm"
        >
          Trusted by logistics teams managing 100+ vehicles daily.
        </motion.p>
      </div>

      {/* Right — Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Mobile-only logo */}
          <div className="flex lg:hidden flex-col items-center mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30 mb-4">
              <Truck className="text-white" size={28} />
            </div>
            <h1 className="text-2xl font-bold text-white">FleetFlow</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white">Welcome back</h2>
            <p className="text-slate-400 mt-2">
              Sign in to access your dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <Input
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                required
                className="pl-11"
              />
            </div>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="pl-11 pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input type="checkbox" className="rounded accent-emerald-500" />
                Remember me
              </label>

              <a href="#" className="text-emerald-400 hover:text-emerald-300">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-slate-500 text-xs">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 h-11 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-300 text-sm font-medium hover:bg-slate-800 transition-colors"
            >
              Google
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 h-11 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-300 text-sm font-medium hover:bg-slate-800 transition-colors"
            >
              Microsoft
            </button>
          </div>

          <p className="text-center text-slate-500 text-sm mt-8">
            Don't have an account?{" "}
            <a href="#" className="text-emerald-400 hover:text-emerald-300">
              Contact admin
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;