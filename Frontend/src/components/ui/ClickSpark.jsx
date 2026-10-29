import { useRef } from "react";

export default function ClickSpark({
  children,
  sparkColor = "#10b981",
  sparkSize = 10,
  sparkCount = 8,
  duration = 400,
  className = "",
  ...props
}) {
  const containerRef = useRef(null);

  const handleClick = (e) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create canvas spark particles
    for (let i = 0; i < sparkCount; i++) {
      const spark = document.createElement("span");
      const angle = (i * (360 / sparkCount) + Math.random() * 20) * (Math.PI / 180);
      const distance = Math.random() * 28 + 14;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      spark.style.position = "absolute";
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.width = `${sparkSize}px`;
      spark.style.height = `${sparkSize}px`;
      spark.style.borderRadius = "9999px";
      spark.style.backgroundColor = sparkColor;
      spark.style.boxShadow = `0 0 8px ${sparkColor}`;
      spark.style.pointerEvents = "none";
      spark.style.zIndex = "50";
      spark.style.transform = "translate(-50%, -50%) scale(1)";
      spark.style.transition = `transform ${duration}ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity ${duration}ms ease-out`;

      container.appendChild(spark);

      requestAnimationFrame(() => {
        spark.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`;
        spark.style.opacity = "0";
      });

      setTimeout(() => {
        spark.remove();
      }, duration);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className={`relative inline-flex overflow-visible ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
