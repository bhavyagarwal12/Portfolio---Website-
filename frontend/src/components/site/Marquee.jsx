import { FaPython, FaFlask, FaChartBar, FaChartPie } from "react-icons/fa";
import { SiPandas, SiMysql, SiScikitlearn, SiNumpy } from "react-icons/si";
import { TbSql } from "react-icons/tb";

const items = [
  { icon: FaPython, label: "Python" },
  { icon: TbSql, label: "SQL" },
  { icon: FaChartBar, label: "Power BI" },
  { icon: FaChartPie, label: "Tableau" },
  { icon: SiScikitlearn, label: "Scikit-learn" },
  { icon: FaFlask, label: "Flask" },
  { icon: SiPandas, label: "Pandas" },
  { icon: SiNumpy, label: "NumPy" },
  { icon: SiMysql, label: "MySQL" },
];

const Row = () => (
  <div className="flex shrink-0 items-center">
    <span className="mx-8 font-display text-sm font-medium uppercase tracking-[0.35em] text-[#7C5CFC]">
      Certified in AI-Driven Data Analytics
    </span>
    <span className="mx-4 text-white/15">/</span>
    {items.map((it, i) => {
      const Icon = it.icon;
      return (
        <div key={i} className="mx-6 flex items-center gap-2 text-[#9A9AA5]">
          <Icon className="h-5 w-5" />
          <span className="text-sm">{it.label}</span>
        </div>
      );
    })}
    <span className="mx-4 text-white/15">/</span>
  </div>
);

export const Marquee = () => (
  <section
    className="relative w-full overflow-hidden border-y border-white/5 bg-[#0A0A0F] py-6"
    data-testid="trust-marquee"
  >
    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#0A0A0F] to-transparent" />
    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#0A0A0F] to-transparent" />
    <div className="flex w-max marquee-track">
      <Row />
      <Row />
    </div>
  </section>
);
