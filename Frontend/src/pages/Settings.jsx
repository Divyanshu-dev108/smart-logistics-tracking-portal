import { useState, useEffect } from "react";
import { User, Bell, Lock, Save, Sliders, Shield, Volume2, VolumeX, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "../components/common/PageHeader";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { isSoundEnabled, setSoundEnabled, playSuccessSound } from "../utils/sound";

export default function Settings() {
  const [profile, setProfile] = useState({
    name: "Rajneesh Kumar",
    email: "rajneesh@fleetflow.com",
    phone: "+91 98765 43210",
  });

  const [password, setPassword] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [notifications, setNotifications] = useState({
    tripUpdates: true,
    maintenanceAlerts: true,
    weeklyReports: true,
    smsAlerts: false,
  });

  const [soundEnabled, setSound] = useState(false);

  useEffect(() => {
    setSound(isSoundEnabled());
  }, []);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSound(next);
    setSoundEnabled(next);
    if (next) {
      setTimeout(() => playSuccessSound(), 60);
      toast.success("Tactile UI audio micro-feedback enabled!");
    } else {
      toast.success("Tactile UI audio feedback muted");
    }
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      toast.success(
        `${key.replace(/([A-Z])/g, " $1").toLowerCase()} ${updated[key] ? "enabled" : "disabled"}`
      );
      return updated;
    });
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    playSuccessSound();
    toast.success("Profile preferences saved successfully!");
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    if (password.newPassword !== password.confirm) {
      toast.error("New passwords do not match. Please recheck.");
      return;
    }
    if (password.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    playSuccessSound();
    toast.success("Password updated securely!");
    setPassword({ current: "", newPassword: "", confirm: "" });
  };

  return (
    <div className="space-y-7 sm:space-y-8 pb-12 w-full max-w-full min-w-0">
      <PageHeader
        title="Settings & Preferences"
        subtitle="Manage administrative credentials, communications dispatch, and telemetry preferences."
        badge="Enterprise Tier"
        icon={Sliders}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
        {/* Profile Card */}
        <Card className="p-6 sm:p-7 border border-slate-800/80 shadow-2xl rounded-2xl">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 shadow-sm">
              <User size={18} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white font-sans tracking-tight">
                Profile Information
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Update your identity details & contact point
              </p>
            </div>
          </div>

          <form onSubmit={handleProfileSave} className="space-y-4">
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-800/80">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=1e293b&color=10b981&bold=true&size=64`}
                alt="Profile"
                className="h-14 w-14 rounded-2xl border-2 border-emerald-500/40 shadow-md bg-slate-800"
              />
              <div>
                <p className="text-sm font-semibold text-white font-display">
                  {profile.name}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Platform Administrator
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Full Name
              </label>
              <Input
                name="name"
                placeholder="Full Name"
                value={profile.name}
                onChange={handleProfileChange}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Email Address
              </label>
              <Input
                name="email"
                type="email"
                placeholder="Email Address"
                value={profile.email}
                onChange={handleProfileChange}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Phone Number
              </label>
              <Input
                name="phone"
                placeholder="Phone Number"
                value={profile.phone}
                onChange={handleProfileChange}
                required
              />
            </div>

            <Button type="submit" starBorder={true} className="w-full mt-2">
              <Save size={15} />
              Save Profile Details
            </Button>
          </form>
        </Card>

        {/* Security / Password Card */}
        <Card className="p-6 sm:p-7 border border-slate-800/80 shadow-2xl rounded-2xl">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0 shadow-sm">
              <Lock size={18} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white font-sans tracking-tight">
                Security & Authentication
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Rotate your account master key
              </p>
            </div>
          </div>

          <form onSubmit={handlePasswordSave} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Current Password
              </label>
              <Input
                name="current"
                type="password"
                placeholder="••••••••••••"
                value={password.current}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                New Password
              </label>
              <Input
                name="newPassword"
                type="password"
                placeholder="Minimum 6 characters"
                value={password.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Confirm New Password
              </label>
              <Input
                name="confirm"
                type="password"
                placeholder="Re-enter new password"
                value={password.confirm}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <Button type="submit" variant="secondary" starBorder={true} className="w-full mt-2">
              <Shield size={15} />
              Update Password
            </Button>
          </form>
        </Card>

        {/* Tactile Audio & Haptic Micro-Feedback Card */}
        <Card className="lg:col-span-2 p-6 sm:p-7 border border-slate-800/80 shadow-2xl rounded-2xl">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 shadow-sm">
                {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-white font-sans tracking-tight">
                    Tactile UI Audio Micro-Feedback
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Web Audio API
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Play soft synthesized micro-clicks on button interactions and harmonic chimes on save operations.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleToggleSound}
              className={`relative h-7 w-12 rounded-full transition-colors duration-200 shrink-0 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 cursor-pointer ${
                soundEnabled ? "bg-emerald-500 shadow-lg shadow-emerald-500/30" : "bg-slate-700"
              }`}
            >
              <span
                className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                  soundEnabled ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>
        </Card>

        {/* Notification Preferences */}
        <Card className="lg:col-span-2 p-6 sm:p-7 border border-slate-800/80 shadow-2xl rounded-2xl">
          <div className="flex items-center gap-3.5 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 shrink-0 shadow-sm">
              <Bell size={18} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white font-sans tracking-tight">
                Notification Broadcast Rules
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Configure real-time automated alerting channels
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-800/70">
            {[
              {
                key: "tripUpdates",
                label: "Trip telemetry & status updates",
                desc: "Receive real-time push alerts when trips depart, arrive, or deviate.",
              },
              {
                key: "maintenanceAlerts",
                label: "Vehicle health & maintenance alerts",
                desc: "Trigger diagnostic notices when engine hours exceed threshold.",
              },
              {
                key: "weeklyReports",
                label: "Weekly executive performance digests",
                desc: "Automated Monday morning PDF breakdown of SLA fulfillment.",
              },
              {
                key: "smsAlerts",
                label: "Urgent SMS dispatch warnings",
                desc: "Send emergency priority SMS for route blockage or breakdown.",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between py-4 first:pt-2 last:pb-2"
              >
                <div>
                  <p className="text-sm font-medium text-white font-body">
                    {item.label}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {item.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleNotification(item.key)}
                  className={`relative h-6 w-11 rounded-full transition-colors duration-200 shrink-0 ml-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 ${
                    notifications[item.key] ? "bg-emerald-500 shadow-sm shadow-emerald-500/50" : "bg-slate-700"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                      notifications[item.key] ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}