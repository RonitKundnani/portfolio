import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { skillGraph } from '../data/skills';

const WIDTH = 1080;
const HEIGHT = 780;
const CENTER = { x: WIDTH / 2, y: HEIGHT / 2 + 10 };
const CATEGORY_RADIUS = 165;
const SKILL_RADIUS = 320;
const LABEL_OFFSET = 14;
const MAX_ARC_DEG = 58; // total angular spread per category, however many skills it has

function polar(cx: number, cy: number, radius: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
}

// Keeps radial text upright: rotate along the spoke, but flip+anchor-end
// on the left half so labels never render upside down.
function radialLabelProps(cx: number, cy: number, angleDeg: number, radius: number): {
  x: number;
  y: number;
  transform: string;
  anchor: 'start' | 'end';
} {
  const facingLeft = Math.cos((angleDeg * Math.PI) / 180) < 0;
  const pos = polar(cx, cy, radius, angleDeg);
  const rotate = facingLeft ? angleDeg + 180 : angleDeg;
  return {
    x: pos.x,
    y: pos.y,
    transform: `rotate(${rotate} ${pos.x} ${pos.y})`,
    anchor: facingLeft ? 'end' : 'start',
  };
}

export default function SkillsGraph() {
  const [hovered, setHovered] = useState<string | null>(null);
  const totalSkills = useMemo(() => skillGraph.reduce((sum, c) => sum + c.skills.length, 0), []);

  const layout = useMemo(() => {
    const n = skillGraph.length;
    return skillGraph.map((cat, i) => {
      const angle = -90 + (360 / n) * i;
      const pos = polar(CENTER.x, CENTER.y, CATEGORY_RADIUS, angle);
      const count = cat.skills.length;
      const step = count > 1 ? MAX_ARC_DEG / (count - 1) : 0;
      const skills = cat.skills.map((skill, j) => {
        const offset = (j - (count - 1) / 2) * step;
        const skillAngle = angle + offset;
        const skillPos = polar(CENTER.x, CENTER.y, SKILL_RADIUS, skillAngle);
        return { ...skill, ...skillPos, angle: skillAngle };
      });
      return { ...cat, angle, ...pos, skills };
    });
  }, []);

  return (
    <section id="skills" className="relative px-6 py-32 sm:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <span className="text-[11px] uppercase tracking-[5px] text-cyan-dim">// 03</span>
          <h2 className="font-display text-3xl font-bold tracking-wide text-[#eafffb] sm:text-4xl">
            Topic Map
          </h2>
          <p className="max-w-md text-[12.5px] opacity-70">
            {totalSkills} topics across {skillGraph.length} nodes — hover a category to trace its edges.
          </p>
        </div>

        <motion.svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="mx-auto w-full max-w-4xl"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* center -> category edges */}
          {layout.map((cat) => (
            <line
              key={`edge-${cat.id}`}
              x1={CENTER.x}
              y1={CENTER.y}
              x2={cat.x}
              y2={cat.y}
              stroke="#5eead4"
              strokeWidth={hovered === null || hovered === cat.id ? 1 : 0.4}
              opacity={hovered === null || hovered === cat.id ? 0.55 : 0.12}
            />
          ))}

          {/* category -> skill edges */}
          {layout.map((cat) =>
            cat.skills.map((skill) => (
              <line
                key={`${cat.id}-${skill.name}`}
                x1={cat.x}
                y1={cat.y}
                x2={skill.x}
                y2={skill.y}
                stroke="#5eead4"
                strokeWidth={hovered === cat.id ? 1 : 0.4}
                opacity={hovered === null ? 0.3 : hovered === cat.id ? 0.7 : 0.06}
              />
            ))
          )}

          {/* skill nodes */}
          {layout.map((cat) =>
            cat.skills.map((skill) => {
              const label = radialLabelProps(skill.x, skill.y, skill.angle, LABEL_OFFSET);
              return (
                <g
                  key={`node-${cat.id}-${skill.name}`}
                  opacity={hovered === null || hovered === cat.id ? 1 : 0.18}
                >
                  <circle cx={skill.x} cy={skill.y} r={3.5} fill="#5eead4" />
                  <text
                    x={label.x}
                    y={label.y}
                    transform={label.transform}
                    textAnchor={label.anchor}
                    dominantBaseline="middle"
                    fontSize="10.5"
                    fill="#cfe9e4"
                    fontFamily="'Share Tech Mono', monospace"
                    letterSpacing="0.5"
                  >
                    {skill.name}
                  </text>
                </g>
              );
            })
          )}

          {/* category nodes */}
          {layout.map((cat) => (
            <g
              key={`cat-${cat.id}`}
              onMouseEnter={() => setHovered(cat.id)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
            >
              <circle
                cx={cat.x}
                cy={cat.y}
                r={hovered === cat.id ? 10 : 8}
                fill="#0a1012"
                stroke="#5eead4"
                strokeWidth={hovered === cat.id ? 2 : 1.4}
                className="transition-all"
              />
              <text
                x={cat.x}
                y={cat.y + (cat.y > CENTER.y ? 26 : -20)}
                textAnchor="middle"
                fontSize="12.5"
                fontWeight={700}
                fill={hovered === cat.id ? '#5eead4' : '#eafffb'}
                fontFamily="Orbitron, sans-serif"
                letterSpacing="0.5"
              >
                {cat.label}
              </text>
            </g>
          ))}

          {/* root node */}
          <circle cx={CENTER.x} cy={CENTER.y} r={22} fill="#0a1012" stroke="#5eead4" strokeWidth={2} />
          <text
            x={CENTER.x}
            y={CENTER.y + 4}
            textAnchor="middle"
            fontSize="11"
            fontWeight={700}
            fill="#5eead4"
            fontFamily="Orbitron, sans-serif"
          >
            RK
          </text>
        </motion.svg>

        <div className="mx-auto mt-16 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGraph.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              onMouseEnter={() => setHovered(cat.id)}
              onMouseLeave={() => setHovered(null)}
              className={`hud-panel p-4 transition-opacity ${
                hovered && hovered !== cat.id ? 'opacity-40' : 'opacity-100'
              }`}
            >
              <div className="mb-3 text-[12px] font-bold uppercase tracking-[1.5px] text-cyan">
                {cat.label}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((s) => (
                  <span key={s.name} className="hud-chip">
                    {s.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
