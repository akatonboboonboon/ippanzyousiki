import { categoryFor } from "./data/types";
import type { CategoryScore } from "./lib/quiz";

export default function Radar({
  scores,
  sample = false,
  legacy = false,
}: {
  scores: CategoryScore[];
  sample?: boolean;
  legacy?: boolean;
}) {
  const categories = scores.map((s) => categoryFor(s.category, legacy));
  const center = 180;
  const radius = 115;
  const point = (index: number, value: number) => {
    const angle = (index * Math.PI * 2) / scores.length - Math.PI / 2;
    return [
      center + Math.cos(angle) * radius * value,
      center + Math.sin(angle) * radius * value,
    ];
  };
  const measured = scores.every((score) => score.percent !== null);
  const points = scores
    .map((score, i) => point(i, (score.percent ?? 0) / 100).join(","))
    .join(" ");
  return (
    <svg
      className="radar"
      viewBox="0 0 360 355"
      role="img"
      aria-label={
        sample
          ? "診断後のレーダーチャートのサンプル"
          : `ジャンル別正答率。${scores.map((s) => `${categories.find((c) => c.id === s.category)!.name} ${s.percent === null ? "未測定" : `${s.percent}%`}`).join("、")}`
      }
    >
      {[0.25, 0.5, 0.75, 1]
        .map((scale) => (
          <polygon
            key={scale}
            points={categories
              .map((_, i) => point(i, scale).join(","))
              .join(" ")}
            fill={scale === 1 ? "var(--radar-bg, #f7faf7)" : "none"}
            stroke="#dce6dc"
            className={scale === 1 ? "radar-outer" : ""}
          />
        ))
        .reverse()}
      {categories.map((c, i) => (
        <line
          key={c.id}
          x1={center}
          y1={center}
          x2={point(i, 1)[0]}
          y2={point(i, 1)[1]}
          stroke="#dce6dc"
        />
      ))}
      {[25, 50, 75, 100].map((value) => (
        <text
          key={value}
          x={center + 5}
          y={center - (radius * value) / 100 + 3}
          fontSize="9"
          fill="#8b9b90"
        >
          {value}
        </text>
      ))}
      {measured && (
        <polygon
          points={points}
          fill="rgba(67, 143, 100, .18)"
          stroke="#388365"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      )}
      {!measured &&
        scores.map(
          (s, i) =>
            s.percent !== null && (
              <line
                key={s.category}
                x1={center}
                y1={center}
                x2={point(i, s.percent / 100)[0]}
                y2={point(i, s.percent / 100)[1]}
                stroke="#388365"
                strokeWidth="3"
                opacity=".45"
              />
            ),
        )}
      {scores.map(
        (s, i) =>
          s.percent !== null && (
            <circle
              key={s.category}
              cx={point(i, s.percent / 100)[0]}
              cy={point(i, s.percent / 100)[1]}
              r="4"
              fill="#388365"
              stroke="white"
              strokeWidth="2"
            />
          ),
      )}
      {categories.map((category, i) => {
        const [x, y] = point(i, 1.29);
        return (
          <g key={category.id}>
            <text x={x} y={y + 4} textAnchor="middle" className="radar-label">
              {category.short === "IT" ? "IT・情報" : category.short}
            </text>
            {!sample && (
              <text
                x={x}
                y={y + 20}
                textAnchor="middle"
                fontSize="10"
                fill="#7c877f"
              >
                {scores[i]?.percent === null
                  ? "未測定"
                  : `${scores[i]?.percent}%`}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
