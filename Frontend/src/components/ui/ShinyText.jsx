import { motion } from "framer-motion";

export default function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = "",
}) {
  if (disabled) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span
      className={`inline-block bg-[linear-gradient(110deg,#ffffff,35%,#10b981,50%,#ffffff,65%,#ffffff)] bg-[length:250%_100%] bg-clip-text text-transparent animate-shiny ${className}`}
      style={{
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </span>
  );
}
