import { ArrowUpRight } from "lucide-react";
import { Reveal, ChapterLabel } from "./Reveal";
import { PROJECTS } from "../../data";

export const Projects = () => (
  <section id="projects" className="relative mx-auto w-full max-w-6xl px-6 py-28" data-testid="projects-section">
    <ChapterLabel no="03" label="Projects" />

    <Reveal>
      <h2 className="mb-14 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-[#F5F5F7] sm:text-5xl">
        Real-world results with <span className="text-gradient">custom analytics</span>.
      </h2>
    </Reveal>

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {PROJECTS.map((p, i) => (
        <Reveal key={p.no} delay={i * 0.08}>
          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`project-card-${p.no}`}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/5 bg-[#111116] transition-colors duration-500 hover:border-[#7C5CFC]/40"
          >
            <div className="p-2 pb-0">
              <div className="relative aspect-[16/11] overflow-hidden rounded-2xl">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-transparent to-transparent" />
                <span className="absolute left-4 top-4 font-display text-4xl font-bold text-white/70 mix-blend-overlay">
                  {p.no}
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-4 p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl font-medium leading-snug text-[#F5F5F7]">
                  {p.title}
                </h3>
                <span className="mt-1 shrink-0 text-xs text-[#6C6C7A]">{p.period}</span>
              </div>
              <p className="text-sm leading-relaxed text-[#9A9AA5]">{p.summary}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-[#9A9AA5]"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-[#7C5CFC] transition-colors duration-300 group-hover:text-[#8B7CF6]">
                View Case Study
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </a>
        </Reveal>
      ))}
    </div>
  </section>
);
