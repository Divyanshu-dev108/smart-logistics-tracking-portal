import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { login } from "../services/authService";
import {
  Truck,
  Eye,
  EyeOff,
  MapPinned,
  BarChart3,
  ShieldCheck,
  UserCog,
  User,
  Package,
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

const roles = [
  {
    id: "admin",
    label: "Admin",
    icon: UserCog,
    desc: "Full platform access",
    color: "emerald",
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
    color: "blue",
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
    color: "purple",
    gradient: "from-purple-400 to-purple-600",
    glow: "shadow-purple-500/30",
    ring: "ring-purple-500",
    text: "text-purple-400",
    bg: "bg-purple-500/10",
  },
];

const placeholders = {
  admin: { email: "admin@fleetflow.com", label: "Admin Portal" },
  driver: { email: "driver@fleetflow.com", label: "Driver Portal" },
  customer: { email: "customer@fleetflow.com", label: "Customer Portal" },
};

const Login = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const activeRole = roles.find((r) => r.id === selectedRole);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (roleId) => {
    setSelectedRole(roleId);
    setForm({ email: "", password: "" });
  };

 // handleSubmit — route to role-specific areas
 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const data = await login(form.email, form.password);

    alert("Login Successful");

    switch (data.user.role) {
      case "admin":
        navigate("/admin/dashboard");
        break;

      case "driver":
        navigate("/driver/home");
        break;

      default:
        navigate("/customer/home");
    }
  } catch (error) {
    console.log(error);
    console.log(error.response?.data);

    alert(error.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left — Branding */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between p-12 border-r border-slate-800/60">
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

          {/* Role preview pills */}
          <div className="flex gap-3">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <div
                  key={role.id}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium
                    ${role.bg} border-slate-700/50 ${role.text}`}
                >
                  <Icon size={13} />
                  {role.label}
                </div>
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
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 relative overflow-hidden">
        {/* Subtle bg glow that changes with role */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRole}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
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

          {/* Heading */}
          <div className="mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRole}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-white">
                  {placeholders[selectedRole].label}
                </h2>
                <p className="text-slate-400 mt-1">
                  Sign in as{" "}
                  <span className={activeRole.text}>
                    {activeRole.label}
                  </span>{" "}
                  to continue.
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Role Selector */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {roles.map((role) => {
              const Icon = role.icon;
              const isActive = selectedRole === role.id;

              return (
                <motion.button
                  key={role.id}
                  type="button"
                  onClick={() => handleRoleChange(role.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-300
                    ${isActive
                      ? `${role.bg} ${role.ring} ring-1 border-transparent shadow-lg ${role.glow}`
                      : "bg-slate-900/50 border-slate-800 hover:border-slate-600"
                    }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300
                      ${isActive
                        ? `bg-gradient-to-br ${role.gradient} shadow-lg ${role.glow}`
                        : "bg-slate-800"
                      }`}
                  >
                    <Icon
                      size={18}
                      className={isActive ? "text-white" : "text-slate-400"}
                    />
                  </div>

                  <div className="text-center">
                    <p
                      className={`text-sm font-semibold transition-colors ${
                        isActive ? role.text : "text-slate-300"
                      }`}
                    >
                      {role.label}
                    </p>
                    <p className="text-xs text-slate-500 leading-tight mt-0.5">
                      {role.desc}
                    </p>
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="role-indicator"
                      className={`absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-gradient-to-br ${role.gradient}`}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              name="email"
              placeholder={`${activeRole.label} email address`}
              value={form.email}
              onChange={handleChange}
              required
            />

            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input type="checkbox" className="rounded accent-emerald-500" />
                Remember me
              </label>

              <a href="#" className={`${activeRole.text} hover:opacity-80 transition-opacity`}>
                Forgot password?
              </a>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full h-12 rounded-xl font-semibold text-white transition-all duration-300
                bg-gradient-to-r ${activeRole.gradient}
                shadow-lg ${activeRole.glow}
                hover:shadow-xl
                disabled:opacity-70 disabled:cursor-not-allowed
                flex items-center justify-center mt-2`}
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
                  <motion.span
                    key="text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Sign in as {activeRole.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-8">
            Don't have an account?{" "}
            <a href="#" className={`${activeRole.text} hover:opacity-80 transition-opacity`}>
              Contact admin
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;