import { motion } from "framer-motion";

export default function StarBorder({
  as: Component = "div",
  className = "",
  color = "#10b981",
  speed = "5s",
  children,
  ...props
}) {
  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-xl p-[1px] ${className}`}
      {...props}
    >
      {/* Moving Bottom Star Glow */}
      <div
        className="star-border-bottom absolute w-[300%] h-[50%] opacity-70 bottom-0 right-[-250%] rounded-full pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />

      {/* Moving Top Star Glow */}
      <div
        className="star-border-top absolute w-[300%] h-[50%] opacity-70 top-0 left-[-250%] rounded-full pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full rounded-[11px] overflow-hidden">
        {children}
      </div>
    </Component>
  );
}
