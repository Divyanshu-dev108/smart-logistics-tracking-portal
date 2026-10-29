import { motion } from "framer-motion";

export const pageVariants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.065,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function PageTransition({ children, className = "", ...props }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`w-full max-w-full min-w-0 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function PageSection({ children, className = "", delay = 0, ...props }) {
  return (
    <motion.div
      variants={staggerItem}
      transition={{ delay }}
      className={`w-full min-w-0 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
