import { motion } from 'framer-motion';
import { Project } from '../data/projects';

export default function ProjectCard({ project, i }: { project: Project; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -4, boxShadow: '0 0 24px rgba(94,234,212,0.18)' }}
      transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
      className="hud-panel flex flex-col p-5"
    >
      <div className="flex items-start justify-between">
        <span className="text-[11px] tracking-[2px] text-cyan-dim">
          PROJ // {project.index} — {project.group === 'robotics' ? 'ROBOTICS' : 'WEB'}
        </span>
        <span
          className={`border px-2 py-0.5 text-[10px] uppercase tracking-[1.5px] ${
            project.statusLive ? 'border-cyan text-cyan' : 'border-amber text-amber'
          }`}
        >
          {project.status}
        </span>
      </div>

      <h3 className="font-display mt-2.5 text-[19px] font-bold tracking-wide text-[#eafffb]">
        {project.title}
      </h3>
      <p className="mt-1.5 text-[12.5px] leading-relaxed opacity-85">{project.description}</p>

      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span key={s} className="hud-chip">
            {s}
          </span>
        ))}
      </div>

      <div className="mt-3.5 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-cyan-faint pt-3">
        {project.metrics.map((m) => (
          <div key={m.k}>
            <div className="text-[9.5px] uppercase tracking-[1.5px] text-cyan-dim">{m.k}</div>
            <div className="mt-0.5 text-[13px]">{m.v}</div>
          </div>
        ))}
      </div>

      <div className="mt-3.5 flex items-center justify-between border-t border-cyan-faint pt-2.5">
        <span className="text-[11.5px] tracking-[0.5px] text-cyan opacity-90">
          → {project.outcome}
        </span>
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 border border-cyan-dim px-2.5 py-1 text-[10px] uppercase tracking-[1px] text-cyan-dim transition hover:border-cyan hover:text-cyan"
          >
            View Repo →
          </a>
        )}
      </div>
    </motion.div>
  );
}
