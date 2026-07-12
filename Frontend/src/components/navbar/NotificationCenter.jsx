import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Truck, AlertTriangle, CheckCircle, Package } from "lucide-react";

const generateMockNotification = () => {
  const events = [
    { title: "Speeding Alert", text: "Vehicle TR001 exceeded 80km/h", type: "warning", icon: AlertTriangle },
    { title: "Delivery Complete", text: "Trip #4392 delivered successfully", type: "success", icon: CheckCircle },
    { title: "New Route Assigned", text: "Driver John assigned to TR004", type: "info", icon: Truck },
    { title: "Shipment Delayed", text: "Order #992 delayed due to traffic", type: "warning", icon: Package },
  ];
  const randomEvent = events[Math.floor(Math.random() * events.length)];
  return {
    id: Date.now(),
    ...randomEvent,
    time: "Just now",
    read: false,
  };
};

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "System Update", text: "Logistics portal v2.0 deployed", type: "info", time: "1h ago", read: true, icon: CheckCircle }
  ]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Simulator pushes a new notification every 15 seconds
    const interval = setInterval(() => {
      setNotifications(prev => [generateMockNotification(), ...prev].slice(0, 10)); // keep last 10
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-slate-400 hover:text-white transition-colors p-1"
      >
        <Bell size={18} />
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 shadow shadow-emerald-500/60 ring-2 ring-slate-950 flex items-center justify-center"
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-4 w-80 glass-card rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl z-50 origin-top-right"
          >
            <div className="p-4 border-b border-slate-700/50 flex items-center justify-between bg-slate-900/50">
              <h3 className="text-sm font-semibold text-white">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-[320px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-sm">
                  No notifications yet.
                </div>
              ) : (
                <div className="flex flex-col divide-y divide-slate-800/60">
                  <AnimatePresence initial={false}>
                    {notifications.map((n) => {
                      const Icon = n.icon || Bell;
                      const iconColor = n.type === 'warning' ? 'text-yellow-400' : n.type === 'success' ? 'text-emerald-400' : 'text-blue-400';
                      const bgGlow = n.type === 'warning' ? 'bg-yellow-400/10' : n.type === 'success' ? 'bg-emerald-400/10' : 'bg-blue-400/10';

                      return (
                        <motion.div
                          key={n.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className={`p-4 flex gap-3 hover:bg-slate-800/40 transition-colors cursor-pointer ${!n.read ? 'bg-slate-800/20' : ''}`}
                          onClick={() => {
                            setNotifications(prev => prev.map(notif => notif.id === n.id ? { ...notif, read: true } : notif));
                          }}
                        >
                          <div className={`mt-0.5 h-8 w-8 rounded-full ${bgGlow} flex items-center justify-center shrink-0`}>
                            <Icon size={14} className={iconColor} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className={`text-sm font-medium ${!n.read ? 'text-white' : 'text-slate-300'}`}>
                              {n.title}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5 break-words">
                              {n.text}
                            </p>
                            <p className="text-[10px] text-slate-500 mt-1">
                              {n.time}
                            </p>
                          </div>
                          {!n.read && (
                            <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          )}
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>
            <div className="p-3 border-t border-slate-700/50 bg-slate-900/50 text-center">
              <button className="text-xs text-slate-400 hover:text-white transition-colors font-medium">
                View all history
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
