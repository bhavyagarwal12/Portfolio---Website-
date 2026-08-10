import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { CASE_STUDIES, CASE_STUDY_ORDER } from "../caseStudies";
import { ChartBlock } from "../components/site/ChartBlock";
import { Reveal } from "../components/site/Reveal";

export default function CaseStudy() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const cs = CASE_STUDIES[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!cs) {
    return (
      <div className="grain flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0A0A0F] px-6 text-center">
        <p className="font-display text-3xl text-[#F5F5F7]">Case study not found</p>
        <Link to="/" className="text-sm text-[#7C5CFC] hover:text-[#8B7CF6]">
          ← Back to portfolio
        </Link>
      </div>
    );
  }

  const idx = CASE_STUDY_ORDER.indexOf(slug);
  const nextSlug = CASE_STUDY_ORDER[(idx + 1) % CASE_STUDY_ORDER.length];
  const nextCs = CASE_STUDIES[nextSlug];

  return (
    <div className="grain min-h-screen bg-[#0A0A0F]" data-testid="case-study-page">
      {/* hero */}
      <section className="relative overflow-hidden px-6 pb-14 pt-16">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[60vh] w-[120vw] -translate-x-1/2">
          <div
            className="h-full w-full"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 20%, #2d1b4e 0%, #1a1035 35%, rgba(10,10,15,0) 72%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl">
          <button
            onClick={() => navigate("/#projects")}
            data-testid="case-study-back"
            className="mb-10 inline-flex items-center gap-2 text-sm text-[#9A9AA5] transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> All projects
          </button>

          <Reveal>
            <div className="flex items-center gap-4">
              <span className="font-display text-sm font-medium tracking-widest text-[#7C5CFC]">
                {cs.no}
              </span>
              <span className="h-px w-10 bg-white/15" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#6C6C7A]">{cs.period}</span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[0.98] tracking-tight text-[#F5F5F7] sm:text-6xl lg:text-7xl">
              {cs.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 font-display text-xl text-[#8B7CF6]">{cs.subtitle}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#9A9AA5]">{cs.tagline}</p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {cs.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#9A9AA5]"
                >
                  {s}
                </span>
              ))}
              <a
                href={cs.github}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="case-study-github"
                className="ml-1 inline-flex items-center gap-2 rounded-full bg-[#7C5CFC] px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-[#8B7CF6] hover:shadow-[0_0_24px_rgba(124,92,252,0.5)]"
              >
                <Github className="h-4 w-4" /> View Repo
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* cover image */}
      <section className="relative z-10 mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/5">
            <img src={cs.image} alt={cs.title} className="h-[280px] w-full object-cover sm:h-[420px]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent" />
          </div>
        </Reveal>
      </section>

      {/* metrics */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-16">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {cs.metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.06}>
              <div className="rounded-3xl border border-white/5 bg-[#111116] p-6">
                <p className="font-display text-4xl font-semibold text-gradient">{m.value}</p>
                <p className="mt-2 text-xs uppercase tracking-widest text-[#6C6C7A]">{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* story */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cs.story.map((s, i) => (
            <Reveal key={s.heading} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-white/5 bg-[#111116] p-7">
                <p className="text-xs uppercase tracking-[0.3em] text-[#7C5CFC]">{s.heading}</p>
                <p className="mt-4 text-sm leading-relaxed text-[#9A9AA5]">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* charts */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-12">
        <Reveal>
          <div className="mb-8 flex items-baseline gap-4">
            <span className="font-display text-sm font-medium uppercase tracking-[0.3em] text-[#9A9AA5]">
              By the numbers
            </span>
            <span className="h-px flex-1 bg-white/10" />
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {cs.charts.map((chart, i) => (
            <Reveal
              key={chart.title}
              delay={i * 0.06}
              className={i === 0 && cs.charts.length % 2 === 1 ? "lg:col-span-2" : ""}
            >
              <ChartBlock chart={chart} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* next project */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-16">
        <Link
          to={`/project/${nextSlug}`}
          data-testid="case-study-next"
          className="group flex items-center justify-between rounded-3xl border border-white/5 bg-[#111116] p-8 transition-colors duration-500 hover:border-[#7C5CFC]/40"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#6C6C7A]">Next case study</p>
            <p className="mt-2 font-display text-2xl font-medium text-[#F5F5F7]">{nextCs.title}</p>
          </div>
          <ArrowUpRight className="h-6 w-6 text-[#7C5CFC] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
        </Link>

        <div className="mt-10 text-center">
          <Link to="/" className="text-sm text-[#6C6C7A] transition-colors hover:text-[#9A9AA5]">
            ← Back to portfolio
          </Link>
        </div>
      </section>
    </div>
  );
}
