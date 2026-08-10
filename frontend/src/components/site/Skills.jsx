import { Reveal, ChapterLabel } from "./Reveal";
import { SKILLS, CERTS } from "../../data";
import { Award, BadgeCheck } from "lucide-react";

export const Skills = () => (
  <section id="skills" className="relative mx-auto w-full max-w-6xl px-6 py-28" data-testid="skills-section">
    <ChapterLabel no="04" label="Skills" />

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {SKILLS.map((cat, i) => (
        <Reveal key={cat.group} delay={i * 0.08}>
          <div className="group h-full rounded-3xl border border-white/5 bg-[#111116] p-8 transition-colors duration-500 hover:border-[#7C5CFC]/30">
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-[#7C5CFC]">{cat.group}</p>
            <div className="flex flex-wrap gap-2.5">
              {cat.items.map((s) => (
                <span
                  key={s}
                  className="rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-2 text-sm text-[#F5F5F7] transition-colors duration-300 hover:border-[#7C5CFC]/40 hover:text-white"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>

    {/* certifications */}
    <div className="mt-20">
      <Reveal>
        <p className="mb-8 font-display text-sm font-medium uppercase tracking-[0.3em] text-[#9A9AA5]">
          Certifications & Recognition
        </p>
      </Reveal>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {CERTS.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08}>
            <div className="flex items-start gap-4 rounded-3xl border border-white/5 bg-[#111116] p-7 transition-colors duration-500 hover:border-[#7C5CFC]/30">
              <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#7C5CFC]">
                {i === 0 ? <BadgeCheck className="h-5 w-5" /> : <Award className="h-5 w-5" />}
              </div>
              <div>
                <h3 className="font-display text-lg font-medium text-[#F5F5F7]">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#9A9AA5]">{c.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
