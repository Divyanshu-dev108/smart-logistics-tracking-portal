import { useEffect, useState, useRef } from "react";

const CHARS = "0123456789ABCDEF!@#$%^&*~";

export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 12,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  className = "",
  animateOn = "mount", // "mount" | "hover"
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  const startAnimation = () => {
    let iteration = 0;
    const target = String(text);
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return target
          .split("")
          .map((char, index) => {
            if (char === " " || char === "₹" || char === "%" || char === "+" || char === "-") {
              return char;
            }
            if (index < iteration) {
              return target[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
      });

      iteration += 1;

      if (iteration > target.length + maxIterations) {
        clearInterval(intervalRef.current);
        setDisplayText(target);
      }
    }, speed);
  };

  useEffect(() => {
    if (animateOn === "mount") {
      startAnimation();
    }
    return () => clearInterval(intervalRef.current);
  }, [text]);

  const handleMouseEnter = () => {
    if (animateOn === "hover") {
      setIsHovered(true);
      startAnimation();
    }
  };

  return (
    <span
      onMouseEnter={handleMouseEnter}
      className={`inline-block font-mono select-none ${className}`}
    >
      {displayText}
    </span>
  );
}
