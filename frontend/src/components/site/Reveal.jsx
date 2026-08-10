import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 40, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const ChapterLabel = ({ no, label }) => (
  <Reveal>
    <div className="mb-10 flex items-baseline gap-4" data-testid={`chapter-${label.toLowerCase()}`}>
      <span className="font-display text-sm font-medium tracking-widest text-[#7C5CFC]">
        {no}
      </span>
      <span className="h-px w-10 bg-white/15" />
      <span className="font-display text-sm font-medium uppercase tracking-[0.3em] text-[#9A9AA5]">
        {label}
      </span>
    </div>
  </Reveal>
);
