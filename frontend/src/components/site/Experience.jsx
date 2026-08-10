import { Reveal, ChapterLabel } from "./Reveal";
import { EXPERIENCE } from "../../data";

export const Experience = () => (
  <section id="experience" className="relative mx-auto w-full max-w-6xl px-6 py-28" data-testid="experience-section">
    <ChapterLabel no="02" label="Experience" />

    <div className="relative mt-6">
      {/* axis */}
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[#7C5CFC] via-[#7C5CFC]/30 to-transparent md:left-[calc(180px+7px)]" />

      <div className="space-y-14">
        {EXPERIENCE.map((exp, i) => (
          <Reveal key={exp.company} delay={i * 0.1}>
            <div className="relative flex flex-col gap-6 pl-10 md:flex-row md:pl-0">
              {/* node */}
              <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-[#7C5CFC] bg-[#0A0A0F] shadow-[0_0_14px_rgba(124,92,252,0.8)] md:left-[180px]" />

              <div className="md:w-[180px] md:pr-10 md:text-right">
                <p className="text-sm font-medium text-[#7C5CFC]">{exp.period}</p>
              </div>

              <div className="flex-1 rounded-3xl border border-white/5 bg-[#111116] p-7 transition-colors duration-500 hover:border-[#7C5CFC]/30 md:ml-14">
                <h3 className="font-display text-2xl font-medium text-[#F5F5F7]">{exp.company}</h3>
                <p className="mt-1 text-sm uppercase tracking-widest text-[#9A9AA5]">{exp.role}</p>
                <ul className="mt-5 space-y-3">
                  {exp.points.map((p, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed text-[#9A9AA5]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7C5CFC]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
