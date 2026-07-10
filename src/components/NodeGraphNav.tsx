import { useEffect, useState } from 'react';

const NODES = [
  { id: 'home', label: '/home' },
  { id: 'projects', label: '/projects' },
  { id: 'skills', label: '/skills' },
  { id: 'achievements', label: '/log' },
  { id: 'contact', label: '/contact' },
];

export default function NodeGraphNav() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const sections = NODES.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => !!el
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed left-1/2 top-5 z-50 -translate-x-1/2">
      <div className="hud-panel flex items-center gap-1 px-4 py-2.5 backdrop-blur-sm">
        {NODES.map((node, i) => {
          const isActive = active === node.id;
          return (
            <div key={node.id} className="flex items-center">
              <a
                href={`#${node.id}`}
                className="group flex flex-col items-center gap-1 px-3 transition"
              >
                <span
                  className={`h-2 w-2 rounded-full transition-all ${
                    isActive
                      ? 'bg-cyan shadow-[0_0_10px_2px_rgba(94,234,212,0.8)]'
                      : 'bg-cyan-dim group-hover:bg-cyan'
                  }`}
                />
                <span
                  className={`text-[10px] uppercase tracking-[1px] transition ${
                    isActive ? 'text-cyan' : 'text-cyan-dim group-hover:text-cyan'
                  }`}
                >
                  {node.label}
                </span>
              </a>
              {i < NODES.length - 1 && (
                <span className="h-px w-5 bg-cyan-faint sm:w-8" />
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
