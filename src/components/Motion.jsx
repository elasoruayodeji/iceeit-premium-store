import { motion, useReducedMotion } from "framer-motion";

// Reveal — fades + slides up as one block
export function Reveal({ children, className = "", delay = 0, y = 28 }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={
        reduced
          ? undefined
          : { duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }
      }
    >
      {children}
    </motion.div>
  );
}

// Stagger — container that staggers its StaggerItem children
export function Stagger({ children, className = "", delay = 0 }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "show"}
      viewport={{ once: true, amount: 0.08 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.18, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

// StaggerItem — child that animates when Stagger container enters view
export function StaggerItem({ children, className = "" }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={
        reduced
          ? undefined
          : {
              hidden: { opacity: 0, y: 26 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}

// Page transition wrapper
export function PageTransition({ children }) {
  const reduced = useReducedMotion();
  return (
    <motion.main
      initial={reduced ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: -12 }}
      transition={
        reduced
          ? undefined
          : { duration: 0.42, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.main>
  );
}