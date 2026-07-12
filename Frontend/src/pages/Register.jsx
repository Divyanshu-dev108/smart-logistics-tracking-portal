import { useState, Suspense } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { register } from "../services/authService";
import {
  Truck,
  Eye,
  EyeOff,
  UserCog,
  Package,
  User,
  Mail,
  Phone,
  Lock,
  CheckCircle2,
} from "lucide-react";
import Input from "../components/ui/Input";
import TechGlobe from "../components/3d/TechGlobe";

const roles = [
  {
    id: "admin",
    label: "Admin",
    icon: UserCog,
    desc: "Full platform access",
    gradient: "from-emerald-400 to-emerald-600",
    glow: "shadow-emerald-500/30",
    ring: "ring-emerald-500",
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    id: "driver",
    label: "Driver",
    icon: Truck,
    desc: "Trips & route access",
    gradient: "from-blue-400 to-blue-600",
    glow: "shadow-blue-500/30",
    ring: "ring-blue-500",
    text: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    id: "customer",
    label: "Customer",
    icon: Package,
    desc: "Track your shipments",
    gradient: "from-purple-400 to-purple-600",
    glow: "shadow-purple-500/30",
    ring: "ring-purple-500",
    text: "text-purple-400",
    bg: "bg-purple-500/10",
  },
];

const steps = ["Role", "Details", "Password"];

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });

  const activeRole = roles.find((r) => r.id === selectedRole);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!form.name || !form.email || !form.phone) {
        setError("Please fill in all fields.");
        return;
      }
    }
    setStep((s) => s + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Passwords don't match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await register({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: selectedRole,
      });

      switch (selectedRole) {
        case "admin": navigate("/admin/dashboard"); break;
        case "driver": navigate("/driver/home"); break;
        default: navigate("/customer/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between p-12 border-r border-slate-800/60 glass">
        <Suspense fallback={null}>
          <TechGlobe />
        </Suspense>
        
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

        {/* Logo */}
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

        {/* Steps visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative z-10 space-y-8"
        >
          <h2 className="text-4xl font-bold text-white leading-tight">
            Get started in
            <br />
            <span className="text-emerald-400">three simple steps.</span>
          </h2>

          <div className="space-y-4">
            {steps.map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-sm font-bold transition-all duration-300
                    ${step > i
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : step === i
                      ? `bg-gradient-to-br ${activeRole.gradient} border-transparent text-white shadow-lg`
                      : "bg-slate-800/60 border-slate-700 text-slate-500"
                    }`}
                >
                  {step > i ? <CheckCircle2 size={18} /> : i + 1}
                </div>
                <div>
                  <p className={`font-medium ${step >= i ? "text-white" : "text-slate-500"}`}>
                    {s}
                  </p>
                  <p className="text-xs text-slate-500">
                    {i === 0 && "Choose your account type"}
                    {i === 1 && "Enter your personal info"}
                    {i === 2 && "Secure your account"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative z-10 text-slate-500 text-sm"
        >
          Already have an account?{" "}
          <Link to="/" className="text-emerald-400 hover:text-emerald-300">
            Sign in
          </Link>
        </motion.p>
      </div>

      {/* Right — Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 relative overflow-hidden">
        {/* bg glow */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRole}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute top-0 right-0 h-72 w-72 rounded-full blur-3xl pointer-events-none
              ${selectedRole === "admin" ? "bg-emerald-500/10" : ""}
              ${selectedRole === "driver" ? "bg-blue-500/10" : ""}
              ${selectedRole === "customer" ? "bg-purple-500/10" : ""}
            `}
          />
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Mobile logo */}
          <div className="flex lg:hidden flex-col items-center mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30 mb-4">
              <Truck className="text-white" size={28} />
            </div>
            <h1 className="text-2xl font-bold text-white">FleetFlow</h1>
          </div>

          {/* Step indicator (mobile) */}
          <div className="flex items-center gap-2 mb-6 lg:hidden">
            {steps.map((s, i) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  step >= i ? `bg-gradient-to-r ${activeRole.gradient}` : "bg-slate-800"
                }`}
              />
            ))}
          </div>

          {/* Heading */}
          <div className="mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <p className={`text-xs font-semibold tracking-widest uppercase mb-1 ${activeRole.text}`}>
                  Step {step + 1} of {steps.length} — {steps[step]}
                </p>
                <h2 className="text-3xl font-bold text-white">
                  {step === 0 && "Choose your role"}
                  {step === 1 && "Your details"}
                  {step === 2 && "Set your password"}
                </h2>
                <p className="text-slate-400 mt-1 text-sm">
                  {step === 0 && "Select how you'll use FleetFlow."}
                  {step === 1 && "We'll use this to set up your account."}
                  {step === 2 && "Choose a strong password to keep your account safe."}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Step 0 — Role */}
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-3 gap-3">
                  {roles.map((role) => {
                    const Icon = role.icon;
                    const isActive = selectedRole === role.id;
                    return (
                      <motion.button
                        key={role.id}
                        type="button"
                        onClick={() => setSelectedRole(role.id)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-300
                          ${isActive
                            ? `${role.bg} ${role.ring} ring-1 border-transparent shadow-lg ${role.glow}`
                            : "bg-slate-900/50 border-slate-800 hover:border-slate-600"
                          }`}
                      >
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300
                          ${isActive ? `bg-gradient-to-br ${role.gradient} shadow-lg` : "bg-slate-800"}`}
                        >
                          <Icon size={18} className={isActive ? "text-white" : "text-slate-400"} />
                        </div>
                        <div className="text-center">
                          <p className={`text-sm font-semibold ${isActive ? role.text : "text-slate-300"}`}>
                            {role.label}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5 leading-tight">{role.desc}</p>
                        </div>
                        {isActive && (
                          <motion.div
                            layoutId="reg-role-dot"
                            className={`absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-gradient-to-br ${role.gradient}`}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                <motion.button
                  type="button"
                  onClick={() => setStep(1)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full h-12 rounded-xl font-semibold text-white mt-2
                    bg-gradient-to-r ${activeRole.gradient}
                    shadow-lg ${activeRole.glow} hover:shadow-xl transition-all duration-300
                    flex items-center justify-center`}
                >
                  Continue as {activeRole.label}
                </motion.button>
              </motion.div>
            )}

            {/* Step 1 — Personal details */}
            {step === 1 && (
              <motion.form
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleNext}
                className="space-y-4"
              >
                <Input
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  
                  required
                />

                <Input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={handleChange}
                  
                  required
                />

                <Input
                  name="phone"
                  type="tel"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={handleChange}
                  
                  required
                />

                {error && (
                  <p className="text-red-400 text-xs text-center">{error}</p>
                )}

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="flex-1 h-12 rounded-xl font-semibold text-slate-300 bg-slate-800/80 border border-slate-700 hover:bg-slate-700 transition-all"
                  >
                    Back
                  </button>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 h-12 rounded-xl font-semibold text-white
                      bg-gradient-to-r ${activeRole.gradient}
                      shadow-lg ${activeRole.glow} transition-all duration-300`}
                  >
                    Continue
                  </motion.button>
                </div>
              </motion.form>
            )}

            {/* Step 2 — Password */}
            {step === 2 && (
              <motion.form
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password (min 6 characters)"
                  value={form.password}
                  onChange={handleChange}
                  required
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                />

                <Input
                  name="confirm"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm password"
                  value={form.confirm}
                  onChange={handleChange}
                  required
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                />

                {/* Password match indicator */}
                {form.confirm && (
                  <p className={`text-xs flex items-center gap-1.5 ${
                    form.password === form.confirm ? "text-emerald-400" : "text-red-400"
                  }`}>
                    <CheckCircle2 size={13} />
                    {form.password === form.confirm ? "Passwords match" : "Passwords don't match"}
                  </p>
                )}

                {error && (
                  <p className="text-red-400 text-xs text-center">{error}</p>
                )}

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 h-12 rounded-xl font-semibold text-slate-300 bg-slate-800/80 border border-slate-700 hover:bg-slate-700 transition-all"
                  >
                    Back
                  </button>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 h-12 rounded-xl font-semibold text-white
                      bg-gradient-to-r ${activeRole.gradient}
                      shadow-lg ${activeRole.glow} hover:shadow-xl
                      disabled:opacity-70 disabled:cursor-not-allowed
                      flex items-center justify-center transition-all duration-300`}
                  >
                    <AnimatePresence mode="wait">
                      {loading ? (
                        <motion.div
                          key="spinner"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                        />
                      ) : (
                        <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          Create Account
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="text-center text-slate-500 text-sm mt-8">
            Already have an account?{" "}
            <Link to="/" className={`${activeRole.text} hover:opacity-80 transition-opacity`}>
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}