import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { playClickSound } from "../../utils/sound";
import "./GooeyNav.css";

const defaultColorPalette = {
  1: "#10b981",
  2: "#059669",
  3: "#34d399",
  4: "#38bdf8",
};

export default function GooeyNav({
  items = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Live Telemetry", href: "/admin/tracking" },
    { label: "Manifests", href: "/admin/trips" },
    { label: "Analytics", href: "/admin/analytics" },
  ],
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  initialActiveIndex = 0,
  animationTime = 600,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  className = "",
  onChange,
}) {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [particles, setParticles] = useState([]);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const navRef = useRef(null);
  const itemsRef = useRef([]);
  const navigate = useNavigate();

  // Position pill over active item
  const updatePillPosition = (index, immediate = false) => {
    const nav = navRef.current;
    const itemEl = itemsRef.current[index];
    if (!nav || !itemEl) return;

    const navRect = nav.getBoundingClientRect();
    const itemRect = itemEl.getBoundingClientRect();

    const left = itemRect.left - navRect.left;
    const width = itemRect.width;

    setPillStyle({
      left,
      width,
      opacity: 1,
      transitionDuration: immediate ? "0ms" : `${animationTime}ms`,
    });
  };

  useEffect(() => {
    updatePillPosition(activeIndex, true);
    const handleResize = () => updatePillPosition(activeIndex, true);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [items, activeIndex]);

  useEffect(() => {
    if (initialActiveIndex !== undefined && initialActiveIndex !== activeIndex) {
      setActiveIndex(initialActiveIndex);
      updatePillPosition(initialActiveIndex);
    }
  }, [initialActiveIndex]);

  const spawnParticles = (fromIndex, toIndex) => {
    const nav = navRef.current;
    const fromEl = itemsRef.current[fromIndex];
    const toEl = itemsRef.current[toIndex];
    if (!nav || !fromEl || !toEl) return;

    const navRect = nav.getBoundingClientRect();
    const fromRect = fromEl.getBoundingClientRect();
    const toRect = toEl.getBoundingClientRect();

    const startX = fromRect.left - navRect.left + fromRect.width / 2;
    const startY = fromRect.top - navRect.top + fromRect.height / 2;

    const endX = toRect.left - navRect.left + toRect.width / 2;
    const endY = toRect.top - navRect.top + toRect.height / 2;

    const newParticles = [];
    const maxDist = particleDistances[0] || 90;
    const minDist = particleDistances[1] || 10;

    for (let i = 0; i < particleCount; i++) {
      const colorKey = colors[i % colors.length];
      const color =
        typeof colorKey === "string"
          ? colorKey
          : defaultColorPalette[colorKey] || "#10b981";

      const variance = (Math.random() * 2 - 1) * timeVariance;
      const duration = Math.max(animationTime + variance, 200);

      // Intermediate arc midpoint
      const t = Math.random();
      const midX = startX + (endX - startX) * t;
      const arcSpread = (Math.random() - 0.5) * (maxDist - minDist);
      const midY = startY + (endY - startY) * t + arcSpread;

      const size = Math.random() * 8 + 6;

      newParticles.push({
        id: Date.now() + i + Math.random(),
        startX,
        startY,
        midX,
        midY,
        endX,
        endY,
        size,
        color,
        duration,
      });
    }

    setParticles(newParticles);

    // Clean up particles after longest animation finishes
    const maxDuration = Math.max(...newParticles.map((p) => p.duration));
    setTimeout(() => {
      setParticles([]);
    }, maxDuration + 100);
  };

  const handleItemClick = (index, item, e) => {
    if (e) e.preventDefault();
    if (index === activeIndex) return;

    playClickSound();
    spawnParticles(activeIndex, index);
    setActiveIndex(index);
    updatePillPosition(index);

    if (onChange) onChange(index, item);
    if (item.onClick) {
      item.onClick(e);
    } else if (item.href || item.path) {
      const destination = item.href || item.path;
      if (destination.startsWith("/")) {
        navigate(destination);
      } else {
        window.location.href = destination;
      }
    }
  };

  return (
    <div className={`gooey-nav-container ${className}`}>
      {/* Liquid SVG Gooey Filter */}
      <svg className="gooey-nav-filter-svg" aria-hidden="true">
        <defs>
          <filter id="gooey-nav-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div ref={navRef} className="gooey-nav-track">
        {/* Gooey Liquid Layer */}
        <div className="gooey-nav-goo-layer">
          {/* Active Liquid Pill */}
          <div
            className="gooey-nav-pill"
            style={{
              transform: `translateX(${pillStyle.left}px)`,
              width: `${pillStyle.width}px`,
              opacity: pillStyle.opacity,
              transitionDuration: pillStyle.transitionDuration || `${animationTime}ms`,
            }}
          />

          {/* Liquid Splashing Droplets */}
          {particles.map((p) => (
            <span
              key={p.id}
              className="gooey-nav-particle"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                boxShadow: `0 0 8px ${p.color}`,
                left: `${p.startX}px`,
                top: `${p.startY}px`,
                transform: `translate(-50%, -50%)`,
                animation: `gooeyFly ${p.duration}ms cubic-bezier(0.25, 1, 0.5, 1) forwards`,
                "--mid-x": `${p.midX - p.startX}px`,
                "--mid-y": `${p.midY - p.startY}px`,
                "--end-x": `${p.endX - p.startX}px`,
                "--end-y": `${p.endY - p.startY}px`,
              }}
            />
          ))}
        </div>

        {/* Clickable Nav Labels */}
        <div className="gooey-nav-items">
          {items.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.label || idx}
                ref={(el) => (itemsRef.current[idx] = el)}
                type="button"
                onClick={(e) => handleItemClick(idx, item, e)}
                className={`gooey-nav-item ${
                  isActive ? "gooey-nav-item--active" : ""
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes gooeyFly {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(calc(-50% + var(--mid-x)), calc(-50% + var(--mid-y))) scale(1.2);
            opacity: 0.9;
          }
          100% {
            transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(0.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
