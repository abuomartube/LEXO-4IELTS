import type { ReactNode } from "react";

export type ChartSpec =
  | { type: "bar"; title: string; subtitle?: string; yLabel?: string; xLabel?: string; categories: string[]; series: { name: string; color: string; values: number[] }[] }
  | { type: "line"; title: string; subtitle?: string; yLabel?: string; xLabel?: string; xValues: (string | number)[]; series: { name: string; color: string; values: number[] }[] }
  | { type: "pie"; title: string; subtitle?: string; segments: { label: string; value: number; color: string }[] }
  | { type: "process"; title: string; subtitle?: string; render: "water-cycle" | "paper-recycling" | "honey-production" }
  | { type: "map"; title: string; subtitle?: string; render: "village-1990-2020" | "park-before-after" | "school-layout-change" };

const PALETTE = {
  teal: "#0d9488",
  sky: "#0284c7",
  amber: "#d97706",
  rose: "#e11d48",
  violet: "#7c3aed",
  emerald: "#059669",
  slate: "#334155",
  orange: "#ea580c",
};

function Axis({ width, height, padding }: { width: number; height: number; padding: { t: number; r: number; b: number; l: number } }) {
  return (
    <>
      <line x1={padding.l} y1={height - padding.b} x2={width - padding.r} y2={height - padding.b} stroke="currentColor" strokeWidth={1.5} className="text-slate-500" />
      <line x1={padding.l} y1={padding.t} x2={padding.l} y2={height - padding.b} stroke="currentColor" strokeWidth={1.5} className="text-slate-500" />
    </>
  );
}

function ChartFrame({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <figure className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-4 text-slate-900 dark:text-slate-100">
      <figcaption className="mb-3 text-center">
        <p className="text-sm font-bold">{title}</p>
        {subtitle && <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{subtitle}</p>}
      </figcaption>
      <div className="w-full overflow-x-auto">{children}</div>
    </figure>
  );
}

function BarChart({ spec }: { spec: Extract<ChartSpec, { type: "bar" }> }) {
  const W = 560, H = 320, P = { t: 20, r: 16, b: 60, l: 52 };
  const innerW = W - P.l - P.r, innerH = H - P.t - P.b;
  const maxVal = Math.max(...spec.series.flatMap(s => s.values));
  const yTickCount = 5;
  const yMax = Math.ceil(maxVal / 10) * 10 || 10;
  const ticks = Array.from({ length: yTickCount + 1 }, (_, i) => (yMax / yTickCount) * i);
  const groupCount = spec.categories.length;
  const groupW = innerW / groupCount;
  const barW = (groupW * 0.7) / spec.series.length;
  const seriesOffset = (groupW - barW * spec.series.length) / 2;

  return (
    <ChartFrame title={spec.title} subtitle={spec.subtitle}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[640px] mx-auto block">
        {ticks.map((t, i) => {
          const y = H - P.b - (t / yMax) * innerH;
          return (
            <g key={i}>
              <line x1={P.l} y1={y} x2={W - P.r} y2={y} stroke="currentColor" strokeWidth={0.5} strokeDasharray="2 3" className="text-slate-300 dark:text-slate-700" />
              <text x={P.l - 6} y={y + 4} textAnchor="end" fontSize={11} className="fill-slate-600 dark:fill-slate-400">{t}</text>
            </g>
          );
        })}
        <Axis width={W} height={H} padding={P} />
        {spec.categories.map((cat, gi) => (
          <g key={gi}>
            {spec.series.map((s, si) => {
              const v = s.values[gi];
              const h = (v / yMax) * innerH;
              const x = P.l + gi * groupW + seriesOffset + si * barW;
              const y = H - P.b - h;
              return (
                <g key={si}>
                  <rect x={x} y={y} width={barW - 2} height={h} fill={s.color} />
                  <text x={x + (barW - 2) / 2} y={y - 4} textAnchor="middle" fontSize={10} className="fill-slate-700 dark:fill-slate-300 font-semibold">{v}</text>
                </g>
              );
            })}
            <text x={P.l + gi * groupW + groupW / 2} y={H - P.b + 16} textAnchor="middle" fontSize={11} className="fill-slate-700 dark:fill-slate-300">{cat}</text>
          </g>
        ))}
        {spec.yLabel && (
          <text x={14} y={H / 2} transform={`rotate(-90 14 ${H / 2})`} textAnchor="middle" fontSize={11} className="fill-slate-700 dark:fill-slate-300 font-medium">{spec.yLabel}</text>
        )}
        {spec.xLabel && <text x={W / 2} y={H - 8} textAnchor="middle" fontSize={11} className="fill-slate-700 dark:fill-slate-300 font-medium">{spec.xLabel}</text>}
        <g transform={`translate(${P.l}, ${H - 36})`}>
          {spec.series.map((s, i) => (
            <g key={i} transform={`translate(${i * 110}, 0)`}>
              <rect width={12} height={12} fill={s.color} />
              <text x={16} y={10} fontSize={11} className="fill-slate-700 dark:fill-slate-300">{s.name}</text>
            </g>
          ))}
        </g>
      </svg>
    </ChartFrame>
  );
}

function LineChart({ spec }: { spec: Extract<ChartSpec, { type: "line" }> }) {
  const W = 560, H = 320, P = { t: 20, r: 16, b: 60, l: 52 };
  const innerW = W - P.l - P.r, innerH = H - P.t - P.b;
  const maxVal = Math.max(...spec.series.flatMap(s => s.values));
  const yMax = Math.ceil(maxVal / 10) * 10 || 10;
  const ticks = Array.from({ length: 6 }, (_, i) => (yMax / 5) * i);
  const n = spec.xValues.length;
  const stepX = n > 1 ? innerW / (n - 1) : 0;
  const xAt = (i: number) => P.l + i * stepX;
  const yAt = (v: number) => H - P.b - (v / yMax) * innerH;

  return (
    <ChartFrame title={spec.title} subtitle={spec.subtitle}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[640px] mx-auto block">
        {ticks.map((t, i) => {
          const y = yAt(t);
          return (
            <g key={i}>
              <line x1={P.l} y1={y} x2={W - P.r} y2={y} stroke="currentColor" strokeWidth={0.5} strokeDasharray="2 3" className="text-slate-300 dark:text-slate-700" />
              <text x={P.l - 6} y={y + 4} textAnchor="end" fontSize={11} className="fill-slate-600 dark:fill-slate-400">{t}</text>
            </g>
          );
        })}
        <Axis width={W} height={H} padding={P} />
        {spec.xValues.map((xv, i) => (
          <text key={i} x={xAt(i)} y={H - P.b + 16} textAnchor="middle" fontSize={11} className="fill-slate-700 dark:fill-slate-300">{String(xv)}</text>
        ))}
        {spec.series.map((s, si) => {
          const path = s.values.map((v, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(v)}`).join(" ");
          return (
            <g key={si}>
              <path d={path} stroke={s.color} strokeWidth={2.5} fill="none" />
              {s.values.map((v, i) => (
                <circle key={i} cx={xAt(i)} cy={yAt(v)} r={3.5} fill={s.color} />
              ))}
            </g>
          );
        })}
        {spec.yLabel && (
          <text x={14} y={H / 2} transform={`rotate(-90 14 ${H / 2})`} textAnchor="middle" fontSize={11} className="fill-slate-700 dark:fill-slate-300 font-medium">{spec.yLabel}</text>
        )}
        {spec.xLabel && <text x={W / 2} y={H - 8} textAnchor="middle" fontSize={11} className="fill-slate-700 dark:fill-slate-300 font-medium">{spec.xLabel}</text>}
        <g transform={`translate(${P.l}, ${H - 36})`}>
          {spec.series.map((s, i) => (
            <g key={i} transform={`translate(${i * 130}, 0)`}>
              <line x1={0} y1={6} x2={18} y2={6} stroke={s.color} strokeWidth={2.5} />
              <circle cx={9} cy={6} r={3} fill={s.color} />
              <text x={24} y={10} fontSize={11} className="fill-slate-700 dark:fill-slate-300">{s.name}</text>
            </g>
          ))}
        </g>
      </svg>
    </ChartFrame>
  );
}

function PieChart({ spec }: { spec: Extract<ChartSpec, { type: "pie" }> }) {
  const W = 520, H = 320, cx = 180, cy = 160, r = 120;
  const total = spec.segments.reduce((s, seg) => s + seg.value, 0);
  let angle = -Math.PI / 2;
  const arcs = spec.segments.map((seg) => {
    const frac = seg.value / total;
    const start = angle;
    const end = angle + frac * 2 * Math.PI;
    angle = end;
    const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end), y2 = cy + r * Math.sin(end);
    const large = frac > 0.5 ? 1 : 0;
    const mid = (start + end) / 2;
    const lx = cx + (r * 0.6) * Math.cos(mid);
    const ly = cy + (r * 0.6) * Math.sin(mid);
    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
    return { seg, path, lx, ly, frac };
  });

  return (
    <ChartFrame title={spec.title} subtitle={spec.subtitle}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[640px] mx-auto block">
        {arcs.map((a, i) => (
          <g key={i}>
            <path d={a.path} fill={a.seg.color} stroke="#fff" strokeWidth={1.5} />
            {a.frac > 0.05 && (
              <text x={a.lx} y={a.ly} textAnchor="middle" fontSize={12} fontWeight={700} fill="#fff">
                {Math.round(a.frac * 100)}%
              </text>
            )}
          </g>
        ))}
        <g transform="translate(340, 60)">
          {spec.segments.map((s, i) => (
            <g key={i} transform={`translate(0, ${i * 22})`}>
              <rect width={14} height={14} fill={s.color} />
              <text x={20} y={12} fontSize={12} className="fill-slate-800 dark:fill-slate-200">{s.label} ({s.value}%)</text>
            </g>
          ))}
        </g>
      </svg>
    </ChartFrame>
  );
}

function WaterCycleDiagram() {
  return (
    <svg viewBox="0 0 560 300" className="w-full max-w-[640px] mx-auto block">
      <defs>
        <marker id="arrow-wc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#0284c7" />
        </marker>
      </defs>
      <rect x="0" y="220" width="560" height="80" fill="#bae6fd" />
      <text x="280" y="270" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0c4a6e">OCEAN</text>
      <circle cx="460" cy="60" r="35" fill="#fde047" />
      <text x="460" y="64" textAnchor="middle" fontSize="11" fontWeight="700" fill="#713f12">SUN</text>
      <g fill="#cbd5e1" stroke="#64748b" strokeWidth="1">
        <ellipse cx="150" cy="70" rx="55" ry="20" />
        <ellipse cx="200" cy="55" rx="45" ry="18" />
        <text x="170" y="68" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e293b">CLOUDS</text>
      </g>
      <path d="M 350 210 Q 300 140 220 85" stroke="#0284c7" strokeWidth="2.5" fill="none" markerEnd="url(#arrow-wc)" />
      <text x="305" y="145" fontSize="11" fontWeight="600" fill="#0c4a6e">1. Evaporation</text>
      <path d="M 140 90 L 140 200" stroke="#0284c7" strokeWidth="2.5" fill="none" markerEnd="url(#arrow-wc)" strokeDasharray="4 3" />
      <text x="50" y="150" fontSize="11" fontWeight="600" fill="#0c4a6e">2. Precipitation</text>
      <text x="50" y="165" fontSize="11" fill="#0c4a6e">(rain/snow)</text>
      <polygon points="70,220 110,150 150,220" fill="#94a3b8" />
      <polygon points="130,220 170,130 210,220" fill="#64748b" />
      <text x="130" y="235" fontSize="10" fontWeight="600" fill="#1e293b">MOUNTAINS</text>
      <path d="M 170 220 Q 250 240 340 230" stroke="#0284c7" strokeWidth="2.5" fill="none" markerEnd="url(#arrow-wc)" />
      <text x="240" y="225" fontSize="11" fontWeight="600" fill="#0c4a6e">3. Runoff (rivers)</text>
      <text x="420" y="270" fontSize="11" fontWeight="600" fill="#0c4a6e">4. Collection</text>
    </svg>
  );
}

function PaperRecyclingDiagram() {
  const box = (x: number, y: number, label: string, stage: string) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width={120} height={50} rx={8} fill="#f1f5f9" stroke="#334155" strokeWidth={1.5} />
      <text x={x + 60} y={y + 20} textAnchor="middle" fontSize={10} fontWeight={700} fill="#334155">{stage}</text>
      <text x={x + 60} y={y + 36} textAnchor="middle" fontSize={11} fill="#0f172a">{label}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 560 340" className="w-full max-w-[640px] mx-auto block">
      <defs>
        <marker id="arrow-pr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#334155" />
        </marker>
      </defs>
      {box(20, 30, "Waste paper", "STAGE 1")}
      {box(220, 30, "Sorting", "STAGE 2")}
      {box(420, 30, "Shredding", "STAGE 3")}
      {box(420, 150, "Pulping", "STAGE 4")}
      {box(220, 150, "Cleaning", "STAGE 5")}
      {box(20, 150, "De-inking", "STAGE 6")}
      {box(20, 270, "Drying", "STAGE 7")}
      {box(220, 270, "Rolling", "STAGE 8")}
      {box(420, 270, "New paper", "FINAL")}
      <path d="M 140 55 L 220 55" stroke="#334155" strokeWidth={2} markerEnd="url(#arrow-pr)" />
      <path d="M 340 55 L 420 55" stroke="#334155" strokeWidth={2} markerEnd="url(#arrow-pr)" />
      <path d="M 480 80 L 480 150" stroke="#334155" strokeWidth={2} markerEnd="url(#arrow-pr)" />
      <path d="M 420 175 L 340 175" stroke="#334155" strokeWidth={2} markerEnd="url(#arrow-pr)" />
      <path d="M 220 175 L 140 175" stroke="#334155" strokeWidth={2} markerEnd="url(#arrow-pr)" />
      <path d="M 80 200 L 80 270" stroke="#334155" strokeWidth={2} markerEnd="url(#arrow-pr)" />
      <path d="M 140 295 L 220 295" stroke="#334155" strokeWidth={2} markerEnd="url(#arrow-pr)" />
      <path d="M 340 295 L 420 295" stroke="#334155" strokeWidth={2} markerEnd="url(#arrow-pr)" />
    </svg>
  );
}

function HoneyProductionDiagram() {
  return (
    <svg viewBox="0 0 560 340" className="w-full max-w-[640px] mx-auto block">
      <defs>
        <marker id="arrow-hp" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#d97706" />
        </marker>
      </defs>
      <g>
        <circle cx="70" cy="70" r="35" fill="#fef3c7" stroke="#d97706" strokeWidth={2} />
        <text x="70" y="68" textAnchor="middle" fontSize={10} fontWeight={700} fill="#78350f">Flowers</text>
        <text x="70" y="82" textAnchor="middle" fontSize={9} fill="#78350f">(nectar)</text>
      </g>
      <path d="M 110 75 L 200 75" stroke="#d97706" strokeWidth={2} markerEnd="url(#arrow-hp)" />
      <text x="155" y="65" textAnchor="middle" fontSize={10} fontWeight={600} fill="#78350f">collected by</text>
      <g>
        <ellipse cx="245" cy="75" rx="45" ry="30" fill="#fde68a" stroke="#d97706" strokeWidth={2} />
        <text x="245" y="72" textAnchor="middle" fontSize={10} fontWeight={700} fill="#78350f">Worker bees</text>
        <text x="245" y="86" textAnchor="middle" fontSize={9} fill="#78350f">(gather nectar)</text>
      </g>
      <path d="M 290 75 L 380 75" stroke="#d97706" strokeWidth={2} markerEnd="url(#arrow-hp)" />
      <text x="335" y="65" textAnchor="middle" fontSize={10} fontWeight={600} fill="#78350f">transported</text>
      <g>
        <rect x="400" y="50" width="100" height="55" rx="6" fill="#facc15" stroke="#d97706" strokeWidth={2} />
        <text x="450" y="72" textAnchor="middle" fontSize={10} fontWeight={700} fill="#78350f">Beehive</text>
        <text x="450" y="88" textAnchor="middle" fontSize={9} fill="#78350f">(hexagonal cells)</text>
      </g>
      <path d="M 450 110 L 450 165" stroke="#d97706" strokeWidth={2} markerEnd="url(#arrow-hp)" />
      <text x="500" y="140" textAnchor="middle" fontSize={10} fontWeight={600} fill="#78350f">stored</text>
      <g>
        <rect x="380" y="170" width="140" height="55" rx="6" fill="#fde68a" stroke="#d97706" strokeWidth={2} />
        <text x="450" y="192" textAnchor="middle" fontSize={10} fontWeight={700} fill="#78350f">Evaporation &amp; ripening</text>
        <text x="450" y="208" textAnchor="middle" fontSize={9} fill="#78350f">(bees fan wings)</text>
      </g>
      <path d="M 380 195 L 290 195" stroke="#d97706" strokeWidth={2} markerEnd="url(#arrow-hp)" />
      <text x="335" y="185" textAnchor="middle" fontSize={10} fontWeight={600} fill="#78350f">sealed with wax</text>
      <g>
        <rect x="150" y="170" width="140" height="55" rx="6" fill="#fbbf24" stroke="#d97706" strokeWidth={2} />
        <text x="220" y="192" textAnchor="middle" fontSize={10} fontWeight={700} fill="#78350f">Honey harvested</text>
        <text x="220" y="208" textAnchor="middle" fontSize={9} fill="#78350f">(by beekeeper)</text>
      </g>
      <path d="M 150 195 L 70 195" stroke="#d97706" strokeWidth={2} markerEnd="url(#arrow-hp)" />
      <g>
        <rect x="10" y="170" width="120" height="55" rx="6" fill="#f59e0b" stroke="#d97706" strokeWidth={2} />
        <text x="70" y="192" textAnchor="middle" fontSize={10} fontWeight={700} fill="#fff">Bottled &amp; sold</text>
        <text x="70" y="208" textAnchor="middle" fontSize={9} fill="#fff">(final product)</text>
      </g>
    </svg>
  );
}

function VillageMap1990_2020() {
  const label = (x: number, y: number, text: string, color = "#1e293b") => (
    <text x={x} y={y} textAnchor="middle" fontSize={10} fontWeight={600} fill={color}>{text}</text>
  );
  return (
    <svg viewBox="0 0 600 340" className="w-full max-w-[680px] mx-auto block">
      <g>
        <text x="140" y="20" textAnchor="middle" fontSize={13} fontWeight={700} fill="#334155">Village in 1990</text>
        <rect x="10" y="30" width="260" height="280" fill="#f0fdf4" stroke="#334155" />
        <path d="M 10 180 L 270 180" stroke="#64748b" strokeWidth={2} />
        {label(140, 195, "Main Road", "#475569")}
        <rect x="30" y="60" width="40" height="30" fill="#94a3b8" />
        <rect x="80" y="60" width="40" height="30" fill="#94a3b8" />
        <rect x="130" y="60" width="40" height="30" fill="#94a3b8" />
        {label(100, 105, "Small houses")}
        <rect x="200" y="55" width="50" height="40" fill="#fcd34d" stroke="#334155" />
        {label(225, 105, "School")}
        <rect x="30" y="220" width="220" height="70" fill="#86efac" stroke="#166534" strokeDasharray="3 3" />
        {label(140, 260, "Farmland", "#166534")}
      </g>
      <g transform="translate(300, 0)">
        <text x="140" y="20" textAnchor="middle" fontSize={13} fontWeight={700} fill="#334155">Village in 2020</text>
        <rect x="10" y="30" width="280" height="280" fill="#f0fdf4" stroke="#334155" />
        <path d="M 10 180 L 290 180" stroke="#64748b" strokeWidth={3} />
        <path d="M 150 30 L 150 310" stroke="#64748b" strokeWidth={2} />
        {label(150, 195, "Main Road", "#475569")}
        {label(170, 45, "New Road", "#475569")}
        <rect x="20" y="55" width="50" height="40" fill="#60a5fa" />
        <rect x="80" y="55" width="50" height="40" fill="#60a5fa" />
        {label(75, 115, "Apartments")}
        <rect x="170" y="55" width="45" height="35" fill="#fcd34d" stroke="#334155" />
        <rect x="225" y="55" width="55" height="35" fill="#fcd34d" stroke="#334155" />
        {label(225, 105, "School (extended)")}
        <rect x="20" y="220" width="110" height="70" fill="#f87171" stroke="#991b1b" />
        {label(75, 260, "Supermarket", "#fff")}
        <rect x="170" y="220" width="110" height="70" fill="#c084fc" stroke="#581c87" />
        {label(225, 260, "Car park &amp; shops", "#fff")}
      </g>
    </svg>
  );
}

function ParkBeforeAfter() {
  const label = (x: number, y: number, text: string, color = "#1e293b") => (
    <text x={x} y={y} textAnchor="middle" fontSize={10} fontWeight={600} fill={color}>{text}</text>
  );
  return (
    <svg viewBox="0 0 600 340" className="w-full max-w-[680px] mx-auto block">
      <g>
        <text x="150" y="20" textAnchor="middle" fontSize={13} fontWeight={700} fill="#334155">Riverside Park — 2010</text>
        <rect x="10" y="30" width="280" height="280" fill="#ecfccb" stroke="#334155" />
        <path d="M 10 120 Q 150 140 290 110" stroke="#60a5fa" strokeWidth={16} fill="none" />
        {label(150, 125, "River", "#1e3a8a")}
        <circle cx="60" cy="210" r="22" fill="#86efac" />
        <circle cx="110" cy="235" r="22" fill="#86efac" />
        <circle cx="180" cy="220" r="22" fill="#86efac" />
        <circle cx="240" cy="240" r="22" fill="#86efac" />
        {label(150, 290, "Grass &amp; scattered trees", "#166534")}
      </g>
      <g transform="translate(300, 0)">
        <text x="150" y="20" textAnchor="middle" fontSize={13} fontWeight={700} fill="#334155">Riverside Park — today</text>
        <rect x="10" y="30" width="280" height="280" fill="#ecfccb" stroke="#334155" />
        <path d="M 10 120 Q 150 140 290 110" stroke="#60a5fa" strokeWidth={16} fill="none" />
        <rect x="130" y="105" width="40" height="12" fill="#7c2d12" stroke="#334155" />
        {label(150, 100, "Bridge", "#7c2d12")}
        <circle cx="60" cy="70" r="20" fill="#f472b6" />
        <rect x="45" y="90" width="30" height="30" fill="#a78bfa" />
        {label(60, 135, "Café")}
        <rect x="200" y="50" width="70" height="50" fill="#fde047" stroke="#334155" />
        {label(235, 80, "Playground", "#713f12")}
        <circle cx="80" cy="220" r="15" fill="#86efac" />
        <circle cx="140" cy="240" r="15" fill="#86efac" />
        <circle cx="200" cy="220" r="15" fill="#86efac" />
        <rect x="40" y="250" width="220" height="12" fill="#64748b" />
        {label(150, 280, "Walking &amp; cycling path", "#334155")}
      </g>
    </svg>
  );
}

function SchoolLayoutChange() {
  const label = (x: number, y: number, text: string, color = "#1e293b", size = 10) => (
    <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={600} fill={color}>{text}</text>
  );
  return (
    <svg viewBox="0 0 600 340" className="w-full max-w-[680px] mx-auto block">
      <g>
        <text x="150" y="20" textAnchor="middle" fontSize={13} fontWeight={700} fill="#334155">School — 2005</text>
        <rect x="10" y="30" width="280" height="280" fill="#f8fafc" stroke="#334155" />
        <rect x="30" y="50" width="90" height="60" fill="#bae6fd" stroke="#334155" />
        {label(75, 85, "Classrooms")}
        <rect x="140" y="50" width="90" height="60" fill="#fde68a" stroke="#334155" />
        {label(185, 85, "Office")}
        <rect x="30" y="140" width="200" height="60" fill="#86efac" stroke="#334155" />
        {label(130, 175, "Playground", "#166534")}
        <rect x="30" y="220" width="90" height="60" fill="#e5e7eb" stroke="#334155" />
        {label(75, 255, "Canteen")}
        <rect x="140" y="220" width="90" height="60" fill="#fecaca" stroke="#334155" />
        {label(185, 255, "Library")}
      </g>
      <g transform="translate(300, 0)">
        <text x="150" y="20" textAnchor="middle" fontSize={13} fontWeight={700} fill="#334155">School — 2025</text>
        <rect x="10" y="30" width="280" height="280" fill="#f8fafc" stroke="#334155" />
        <rect x="30" y="50" width="120" height="60" fill="#bae6fd" stroke="#334155" />
        {label(90, 85, "Classrooms (extended)")}
        <rect x="170" y="50" width="100" height="60" fill="#fde68a" stroke="#334155" />
        {label(220, 85, "Office + ICT")}
        <rect x="30" y="140" width="100" height="60" fill="#86efac" stroke="#334155" />
        {label(80, 175, "Playground", "#166534")}
        <rect x="150" y="140" width="120" height="60" fill="#a78bfa" stroke="#334155" />
        {label(210, 175, "Sports Hall", "#fff")}
        <rect x="30" y="220" width="115" height="60" fill="#e5e7eb" stroke="#334155" />
        {label(87, 255, "Canteen (larger)")}
        <rect x="165" y="220" width="105" height="60" fill="#fecaca" stroke="#334155" />
        {label(217, 255, "Library + study")}
      </g>
    </svg>
  );
}

export function ChartRenderer({ spec }: { spec: ChartSpec }) {
  if (spec.type === "bar") return <BarChart spec={spec} />;
  if (spec.type === "line") return <LineChart spec={spec} />;
  if (spec.type === "pie") return <PieChart spec={spec} />;
  if (spec.type === "process") {
    const diagrams = {
      "water-cycle": <WaterCycleDiagram />,
      "paper-recycling": <PaperRecyclingDiagram />,
      "honey-production": <HoneyProductionDiagram />,
    };
    return (
      <ChartFrame title={spec.title} subtitle={spec.subtitle}>
        {diagrams[spec.render]}
      </ChartFrame>
    );
  }
  if (spec.type === "map") {
    const diagrams = {
      "village-1990-2020": <VillageMap1990_2020 />,
      "park-before-after": <ParkBeforeAfter />,
      "school-layout-change": <SchoolLayoutChange />,
    };
    return (
      <ChartFrame title={spec.title} subtitle={spec.subtitle}>
        {diagrams[spec.render]}
      </ChartFrame>
    );
  }
  return null;
}

export { PALETTE };
