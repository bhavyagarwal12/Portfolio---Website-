import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { NAV, PROFILE } from "../../data";
import { Magnetic } from "./Magnetic";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const Navbar = () => {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const mid = window.scrollY + window.innerHeight / 2.2;
      let current = "home";
      for (const s of sections) {
        if (s.offsetTop <= mid) current = s.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-1/2 top-5 z-50 -translate-x-1/2"
      data-testid="floating-navbar"
    >
      <div
        className={`flex items-center gap-1 rounded-full border border-white/10 bg-[#0A0A0F]/70 px-2 py-2 backdrop-blur-xl transition-shadow duration-500 ${
          scrolled ? "shadow-[0_10px_40px_-10px_rgba(124,92,252,0.4)]" : "shadow-lg shadow-black/40"
        }`}
      >
        {NAV.map((n) => (
          <button
            key={n.id}
            onClick={() => scrollTo(n.id)}
            data-testid={`nav-${n.id}`}
            className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
              active === n.id ? "text-white" : "text-[#9A9AA5] hover:text-white"
            }`}
          >
            {active === n.id && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-full bg-white/10"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10 hidden sm:inline">{n.label}</span>
            <span className="relative z-10 sm:hidden">{n.label.slice(0, 4)}</span>
          </button>
        ))}
        <Magnetic className="ml-1">
          <button
            onClick={() => scrollTo("contact")}
            data-testid="nav-lets-talk"
            className="inline-flex items-center gap-1 rounded-full bg-[#7C5CFC] px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-[#8B7CF6] hover:shadow-[0_0_24px_rgba(124,92,252,0.55)]"
          >
            Let's Talk
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </Magnetic>
      </div>
    </motion.nav>
  );
};
