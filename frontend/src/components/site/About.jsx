import { GraduationCap } from "lucide-react";
import { Reveal, ChapterLabel } from "./Reveal";
import { ABOUT } from "../../data";

export const About = () => (
  <section id="about" className="relative mx-auto w-full max-w-6xl px-6 py-28" data-testid="about-section">
    <ChapterLabel no="01" label="About" />

    <Reveal>
      <h2 className="max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-[#F5F5F7] sm:text-5xl lg:text-6xl">
        Driving Decisions With <span className="text-gradient">Smart, Data-Backed</span> Design.
      </h2>
    </Reveal>

    <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-12">
      <Reveal delay={0.05} className="md:col-span-7">
        <div className="h-full rounded-3xl border border-white/5 bg-[#111116] p-8 md:p-10">
          <p className="text-lg leading-relaxed text-[#9A9AA5] sm:text-xl">{ABOUT.body}</p>
        </div>
      </Reveal>

      <Reveal delay={0.15} className="md:col-span-5">
        <div className="group h-full rounded-3xl border border-white/5 bg-[#111116] p-8 transition-colors duration-500 hover:border-[#7C5CFC]/30">
          <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#7C5CFC]">
            <GraduationCap className="h-5 w-5" />
          </div>
          <p className="text-xs uppercase tracking-widest text-[#6C6C7A]">Education</p>
          <h3 className="mt-2 font-display text-xl font-medium text-[#F5F5F7]">
            {ABOUT.education.school}
          </h3>
          <p className="mt-1 text-sm text-[#9A9AA5]">{ABOUT.education.degree}</p>
          <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-5">
            <div>
              <p className="text-xs text-[#6C6C7A]">CGPA</p>
              <p className="font-display text-2xl font-semibold text-[#7C5CFC]">
                {ABOUT.education.cgpa}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#6C6C7A]">Timeline</p>
              <p className="text-sm text-[#F5F5F7]">{ABOUT.education.period}</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {ABOUT.education.coursework.map((c) => (
              <span
                key={c}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#9A9AA5]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
