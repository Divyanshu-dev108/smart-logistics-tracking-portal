export const transitions = {
  // Default slide up
  slideUp: {
    initial: { opacity: 0, y: 24, scale: 0.99 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -16, scale: 0.99 },
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },

  // Slide in from right
  slideRight: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },

  // Zoom in
  zoom: {
    initial: { opacity: 0, scale: 0.94 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.04 },
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },

  // Fade + blur
  blur: {
    initial: { opacity: 0, filter: "blur(8px)", y: 8 },
    animate: { opacity: 1, filter: "blur(0px)", y: 0 },
    exit: { opacity: 0, filter: "blur(8px)", y: -8 },
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Per-route transition assignment
export const getTransition = (pathname) => {
  if (pathname.includes("dashboard")) return transitions.zoom;
  if (pathname.includes("tracking")) return transitions.blur;
  if (pathname.includes("analytics")) return transitions.slideRight;
  return transitions.slideUp;
};