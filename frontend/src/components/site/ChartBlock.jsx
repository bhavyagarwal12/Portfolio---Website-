import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const PALETTE = ["#7C5CFC", "#8B7CF6", "#a78bfa", "#c4b5fd", "#6d4de0", "#5b3fd6"];

const tooltipStyle = {
  background: "#111116",
  border: "1px solid rgba(124,92,252,0.35)",
  borderRadius: 12,
  color: "#F5F5F7",
  fontSize: 12,
};

const axisProps = {
  stroke: "#6C6C7A",
  tick: { fill: "#9A9AA5", fontSize: 12 },
  tickLine: false,
  axisLine: { stroke: "rgba(255,255,255,0.08)" },
};

export const ChartBlock = ({ chart }) => {
  return (
    <div className="rounded-3xl border border-white/5 bg-[#111116] p-6" data-testid={`chart-${chart.title}`}>
      <h3 className="font-display text-lg font-medium text-[#F5F5F7]">{chart.title}</h3>
      {chart.note && <p className="mt-1 text-xs text-[#6C6C7A]">{chart.note}</p>}

      <div className="mt-6 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chart.type === "bar" ? (
            <BarChart data={chart.data} margin={{ top: 6, right: 8, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B7CF6" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="#7C5CFC" stopOpacity={0.35} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey={chart.xKey} {...axisProps} />
              <YAxis {...axisProps} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(124,92,252,0.08)" }} />
              <Bar dataKey={chart.dataKey} fill="url(#barGrad)" radius={[6, 6, 0, 0]} maxBarSize={54} />
            </BarChart>
          ) : chart.type === "line" ? (
            <LineChart data={chart.data} margin={{ top: 6, right: 12, left: -18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey={chart.xKey} {...axisProps} />
              <YAxis {...axisProps} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "rgba(124,92,252,0.4)" }} />
              {chart.lines.map((ln, i) => (
                <Line
                  key={ln.dataKey}
                  type="monotone"
                  dataKey={ln.dataKey}
                  name={ln.label}
                  stroke={PALETTE[i]}
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: PALETTE[i] }}
                  activeDot={{ r: 5 }}
                />
              ))}
            </LineChart>
          ) : (
            <PieChart>
              <Tooltip contentStyle={tooltipStyle} />
              <Pie
                data={chart.data}
                dataKey="value"
                nameKey="name"
                innerRadius={52}
                outerRadius={86}
                paddingAngle={3}
                stroke="none"
              >
                {chart.data.map((_, i) => (
                  <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                ))}
              </Pie>
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>

      {chart.type === "pie" && (
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {chart.data.map((d, i) => (
            <div key={d.name} className="flex items-center gap-2 text-xs text-[#9A9AA5]">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: PALETTE[i % PALETTE.length] }}
              />
              {d.name} · <span className="text-[#F5F5F7]">{d.value}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
