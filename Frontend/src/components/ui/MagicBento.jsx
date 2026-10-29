import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function MagicBento({
  children,
  className = "",
  spotlightColor = "rgba(16, 185, 129, 0.18)",
  borderColor = "rgba(16, 185, 129, 0.4)",
  maxTilt = 6,
  noPadding = false,
  ...props
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Spring-damped 3D rotation values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 350, damping: 25 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setCursorPos({ x: mouseX, y: mouseY });

    // Normalized coordinates (-0.5 to 0.5)
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="min-w-0 w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.2 }}
        className={`relative overflow-hidden rounded-xl border border-white/[0.08] bg-slate-900/70 backdrop-blur-xl transition-shadow duration-300 min-w-0 w-full shadow-lg ${
          noPadding ? "" : "p-5"
        } ${className}`}
        {...props}
      >
        {/* Dynamic Cursor Spotlight Layer */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-xl"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(350px circle at ${cursorPos.x}px ${cursorPos.y}px, ${spotlightColor}, transparent 70%)`,
          }}
        />

        {/* Dynamic Cursor Border Illumination */}
        <div
          className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            border: `1px solid ${borderColor}`,
            maskImage: `radial-gradient(250px circle at ${cursorPos.x}px ${cursorPos.y}px, black 30%, transparent 80%)`,
            WebkitMaskImage: `radial-gradient(250px circle at ${cursorPos.x}px ${cursorPos.y}px, black 30%, transparent 80%)`,
          }}
        />

        {/* Top subtle 1px specular line */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 min-w-0 w-full h-full" style={{ transform: "translateZ(10px)" }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
