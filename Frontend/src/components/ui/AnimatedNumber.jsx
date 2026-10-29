import { useEffect, useState, useRef } from "react";

export default function AnimatedNumber({
  value,
  duration = 1100,
  className = "",
  suffixClassName = "",
}) {
  const [data, setData] = useState({ prefix: "", num: "", suffix: "" });
  const animFrameId = useRef(null);

  useEffect(() => {
    if (value === undefined || value === null) {
      setData({ prefix: "", num: "", suffix: "" });
      return;
    }

    const strValue = String(value);

    // Extract prefix, numeric part, and suffix
    // Matches e.g. "$", "+", "-", "₹" as prefix, "128,450.50" as number, "%", "hrs/day" as suffix
    const match = strValue.match(/^([^0-9.-]*)([0-9,.]+)(.*)$/);

    if (!match) {
      setData({ prefix: "", num: strValue, suffix: "" });
      return;
    }

    const prefix = match[1] || "";
    const numRaw = match[2];
    const suffix = match[3] || "";

    const hasCommas = numRaw.includes(",");
    const targetNum = parseFloat(numRaw.replace(/,/g, ""));

    if (isNaN(targetNum)) {
      setData({ prefix: "", num: strValue, suffix: "" });
      return;
    }

    // Determine decimal precision
    const decimalPart = numRaw.split(".")[1];
    const precision = decimalPart ? decimalPart.length : 0;

    const startTime = performance.now();
    const startNum = 0;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out expo for snappy odometer roll
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = startNum + (targetNum - startNum) * easeOut;

      let formatted = currentVal.toFixed(precision);
      if (hasCommas) {
        const parts = formatted.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        formatted = parts.join(".");
      }

      setData({ prefix, num: formatted, suffix });

      if (progress < 1) {
        animFrameId.current = requestAnimationFrame(animate);
      } else {
        setData({ prefix, num: numRaw, suffix });
      }
    };

    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [value, duration]);

  const isTextSuffix = data.suffix && data.suffix.trim().length > 1 && !/^[0-9]+$/.test(data.suffix);

  return (
    <span className={`tabular-nums font-mono inline-flex items-baseline ${className}`}>
      <span>{data.prefix}{data.num}</span>
      {data.suffix && (
        <span
          className={`font-sans tracking-normal ${
            isTextSuffix
              ? "text-xs sm:text-sm font-medium text-slate-400 ml-1.5"
              : "text-lg sm:text-xl font-bold text-slate-300 ml-0.5"
          } ${suffixClassName}`}
        >
          {data.suffix}
        </span>
      )}
    </span>
  );
}
