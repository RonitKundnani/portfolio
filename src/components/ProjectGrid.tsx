import { useState } from 'react';
import { projects, ProjectGroup } from '../data/projects';
import ProjectCard from './ProjectCard';

type Filter = 'all' | ProjectGroup;

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'ALL' },
  { id: 'robotics', label: 'ROBOTICS' },
  { id: 'web', label: 'WEB' },
];

export default function ProjectGrid() {
  const [filter, setFilter] = useState<Filter>('all');
  const visible = filter === 'all' ? projects : projects.filter((p) => p.group === filter);

  return (
    <section id="projects" className="relative px-6 py-28 sm:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center gap-5 text-center">
          <span className="text-[11px] uppercase tracking-[5px] text-cyan-dim">// 02</span>
          <h2 className="font-display text-3xl font-bold tracking-wide text-[#eafffb] sm:text-4xl">
            Project Log
          </h2>
          <p className="text-[11px] uppercase tracking-[2px] text-cyan-dim">
            {projects.length} logged builds — {visible.length} shown
          </p>

          <div className="hud-panel flex gap-1 p-1">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-1.5 text-[11px] uppercase tracking-[1.5px] transition ${
                  filter === f.id ? 'bg-cyan-faint text-cyan' : 'text-cyan-dim hover:text-cyan'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <ProjectCard key={p.id} project={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
