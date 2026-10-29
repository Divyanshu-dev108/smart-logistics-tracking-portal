import { useEffect } from "react";
import { playClickSound } from "../../utils/sound";

export default function GlobalClickSpark({
  sparkColor = "#10b981",
  sparkSize = 6,
  sparkCount = 8,
  duration = 380,
}) {
  useEffect(() => {
    const handleGlobalClick = (e) => {
      // Trigger sound on any interactive target or anywhere in DOM
      const isInteractive = Boolean(
        e.target?.closest?.(
          'button, a, input, select, textarea, [role="button"], [data-cursor="pointer"], .cursor-pointer, [tabindex]'
        )
      );

      if (isInteractive) {
        playClickSound();
      }

      const x = e.clientX;
      const y = e.clientY;

      const container = document.createElement("div");
      container.style.position = "fixed";
      container.style.left = "0";
      container.style.top = "0";
      container.style.width = "100%";
      container.style.height = "100%";
      container.style.pointerEvents = "none";
      container.style.zIndex = "9998";
      container.style.overflow = "hidden";
      document.body.appendChild(container);

      for (let i = 0; i < sparkCount; i++) {
        const spark = document.createElement("span");
        const angle = (i * (360 / sparkCount) + (Math.random() * 30 - 15)) * (Math.PI / 180);
        const distance = Math.random() * 26 + 12;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        spark.style.position = "absolute";
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;
        spark.style.width = `${sparkSize}px`;
        spark.style.height = `${sparkSize}px`;
        spark.style.borderRadius = "9999px";
        spark.style.backgroundColor = sparkColor;
        spark.style.boxShadow = `0 0 10px ${sparkColor}`;
        spark.style.pointerEvents = "none";
        spark.style.transform = "translate(-50%, -50%) scale(1)";
        spark.style.transition = `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), opacity ${duration}ms ease-out`;

        container.appendChild(spark);

        requestAnimationFrame(() => {
          spark.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`;
          spark.style.opacity = "0";
        });
      }

      setTimeout(() => {
        container.remove();
      }, duration + 50);
    };

    window.addEventListener("click", handleGlobalClick, { capture: true });
    return () => {
      window.removeEventListener("click", handleGlobalClick, { capture: true });
    };
  }, [sparkColor, sparkSize, sparkCount, duration]);

  return null;
}
