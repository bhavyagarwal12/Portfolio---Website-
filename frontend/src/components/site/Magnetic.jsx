import { useRef, useState } from "react";
import { motion } from "framer-motion";

// Gently pulls its child toward the cursor. Naturally inert on touch
// devices (mousemove never fires). Use `block` for full-width buttons.
export const Magnetic = ({ children, strength = 0.4, block = false, className = "" }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    setPos({ x, y });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 190, damping: 14, mass: 0.4 }}
      className={className}
      style={{ display: block ? "block" : "inline-flex" }}
    >
      {children}
    </motion.div>
  );
};
