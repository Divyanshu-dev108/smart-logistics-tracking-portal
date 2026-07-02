import { useState } from "react";
import { User, Bell, Lock, Save } from "lucide-react";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "Rajneesh Kumar",
    email: "rajneesh@fleetflow.com",
    phone: "9876543210",
  });

  const [password, setPassword] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [notifications, setNotifications] = useState({
    tripUpdates: true,
    maintenanceAlerts: true,
    weeklyReports: false,
    smsAlerts: false,
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const toggleNotification = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    alert("Profile updated!");
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    if (password.newPassword !== password.confirm) {
      alert("Passwords don't match!");
      return;
    }
    alert("Password changed!");
    setPassword({ current: "", newPassword: "", confirm: "" });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 mt-2">
          Manage your account and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
              <User size={20} className="text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Profile</h3>
              <p className="text-sm text-slate-400">
                Update your personal details
              </p>
            </div>
          </div>

          <form onSubmit={handleProfileSave} className="space-y-4">
            <div className="flex items-center gap-4 mb-2">
              <img
                src="https://ui-avatars.com/api/?name=Rajneesh&background=10b981&color=fff"
                alt="Profile"
                className="h-16 w-16 rounded-full"
              />
              <Button type="button" variant="secondary" size="sm">
                Change Photo
              </Button>
            </div>

            <Input
              name="name"
              placeholder="Full Name"
              value={profile.name}
              onChange={handleProfileChange}
            />

            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={profile.email}
              onChange={handleProfileChange}
            />

            <Input
              name="phone"
              placeholder="Phone"
              value={profile.phone}
              onChange={handleProfileChange}
            />

            <Button type="submit" className="w-full">
              <Save size={16} className="mr-2" />
              Save Changes
            </Button>
          </form>
        </Card>

        {/* Password */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20">
              <Lock size={20} className="text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                Change Password
              </h3>
              <p className="text-sm text-slate-400">
                Keep your account secure
              </p>
            </div>
          </div>

          <form onSubmit={handlePasswordSave} className="space-y-4">
            <Input
              name="current"
              type="password"
              placeholder="Current Password"
              value={password.current}
              onChange={handlePasswordChange}
              required
            />

            <Input
              name="newPassword"
              type="password"
              placeholder="New Password"
              value={password.newPassword}
              onChange={handlePasswordChange}
              required
            />

            <Input
              name="confirm"
              type="password"
              placeholder="Confirm New Password"
              value={password.confirm}
              onChange={handlePasswordChange}
              required
            />

            <Button type="submit" variant="secondary" className="w-full">
              Update Password
            </Button>
          </form>
        </Card>

        {/* Notifications */}
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/20">
              <Bell size={20} className="text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                Notifications
              </h3>
              <p className="text-sm text-slate-400">
                Choose what you want to be notified about
              </p>
            </div>
          </div>

          <div className="space-y-1">
            {[
              { key: "tripUpdates", label: "Trip status updates" },
              { key: "maintenanceAlerts", label: "Vehicle maintenance alerts" },
              { key: "weeklyReports", label: "Weekly performance reports" },
              { key: "smsAlerts", label: "SMS alerts for urgent issues" },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between py-3 border-b border-slate-800 last:border-0"
              >
                <span className="text-sm text-slate-300">{item.label}</span>

                <button
                  type="button"
                  onClick={() => toggleNotification(item.key)}
                  className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${
                    notifications[item.key] ? "bg-emerald-500" : "bg-slate-700"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-300 ${
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
};

export default Settings;