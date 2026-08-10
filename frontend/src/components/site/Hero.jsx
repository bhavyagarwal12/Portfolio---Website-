import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, ArrowDown } from "lucide-react";
import { PROFILE } from "../../data";

const useLocalTime = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const t = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: PROFILE.timezone,
      });
      setTime(t);
    };
    tick();
    const iv = setInterval(tick, 1000 * 15);
    return () => clearInterval(iv);
  }, []);
  return time;
};

const word = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: "0%",
    transition: { duration: 0.9, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const Hero = () => {
  const time = useLocalTime();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const nameWords = PROFILE.name.split(" ");

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen w-full flex-col items-center overflow-hidden px-6 pb-16 pt-28"
      data-testid="hero-section"
    >
      {/* radial glow bg */}
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute left-1/2 top-[-5%] h-[90vh] w-[130vw] -translate-x-1/2"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 45%, #3a2470 0%, #241553 30%, rgba(26,16,53,0.35) 55%, rgba(10,10,15,0) 74%)",
          }}
        />
      </motion.div>
      {/* spotlight behind wordmark */}
      <div className="pointer-events-none absolute left-1/2 top-[58%] h-[46vh] w-[80vw] max-w-4xl -translate-x-1/2 -translate-y-1/2">
        <div
          className="h-full w-full opacity-70"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(232,228,255,0.18) 0%, rgba(139,124,246,0.10) 40%, rgba(10,10,15,0) 70%)",
          }}
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-[#0A0A0F]" />

      {/* top bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative z-20 flex w-full max-w-6xl items-center justify-between text-xs uppercase tracking-widest text-[#9A9AA5]"
      >
        <div className="flex items-center gap-2" data-testid="hero-location-time">
          <span>{PROFILE.location}</span>
          <span className="text-[#7C5CFC]">•</span>
          <span className="tabular-nums text-white/80">{time}</span>
        </div>
        <div
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111116]/80 px-3 py-1.5 backdrop-blur-md"
          data-testid="status-badge"
        >
          <span className="h-2 w-2 rounded-full bg-[#7C5CFC] shadow-[0_0_8px_rgba(124,92,252,0.9)]">
            <span className="block h-full w-full animate-ping rounded-full bg-[#7C5CFC]" />
          </span>
          <span className="text-[10px] font-medium text-[#F5F5F7] sm:text-xs">OPEN TO WORK</span>
        </div>
      </motion.div>

      {/* main content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-20 flex flex-1 flex-col items-center justify-center py-10 text-center"
      >
        {/* hero photo */}
        <motion.div
          style={{ y: photoY }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-6"
          data-testid="hero-photo"
        >
          <div className="pointer-events-none absolute -inset-8 rounded-full bg-[#7C5CFC] opacity-25 blur-[70px]" />
          <div className="relative w-[240px] overflow-hidden rounded-3xl sm:w-[300px] lg:w-[340px]">
            <img
              src="/bhavy-hero.jpeg"
              alt="Bhavy Agarwal — Data & Analytics Engineer"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-[#0A0A0F]" />
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
          </div>
        </motion.div>

        <h1 className="font-display text-[13vw] font-bold leading-[0.95] tracking-tighter sm:text-7xl lg:text-8xl">
          {nameWords.map((w, i) => (
            <span key={w} className="mx-2 inline-block overflow-hidden pb-2 align-bottom">
              <motion.span
                custom={i}
                variants={word}
                initial="hidden"
                animate="show"
                className="inline-block text-gradient"
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="mt-5 max-w-xl text-base text-[#9A9AA5] sm:text-xl"
          data-testid="hero-tagline"
        >
          {PROFILE.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={PROFILE.resume}
            download
            data-testid="hero-resume-download"
            className="inline-flex items-center gap-2 rounded-full bg-[#7C5CFC] px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-[#8B7CF6] hover:shadow-[0_0_30px_rgba(124,92,252,0.5)]"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            data-testid="hero-email-cta"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-6 py-3 font-medium text-[#F5F5F7] backdrop-blur-md transition-colors duration-300 hover:border-white/30"
          >
            Email Me
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="relative z-20 flex items-center gap-2 text-xs uppercase tracking-widest text-[#6C6C7A]"
      >
        <ArrowDown className="h-4 w-4 animate-bounce" />
        Scroll to explore
      </motion.div>
    </section>
  );
};
