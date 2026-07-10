import { motion } from 'framer-motion';
import { achievements } from '../data/achievements';

export default function AchievementsStrip() {
  return (
    <section id="achievements" className="relative px-6 py-28 sm:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <span className="text-[11px] uppercase tracking-[5px] text-cyan-dim">// 04</span>
          <h2 className="font-display text-3xl font-bold tracking-wide text-[#eafffb] sm:text-4xl">
            Mission Log
          </h2>
        </div>

        <div className="flex flex-col gap-px border border-cyan-faint">
          {achievements.map((a, i) => (
            <motion.div
              key={a.text}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex flex-col gap-1 bg-panel px-5 py-4 sm:flex-row sm:items-center sm:gap-5"
            >
              <span className="w-fit shrink-0 border border-cyan-dim px-2 py-0.5 text-[10px] uppercase tracking-[1.5px] text-cyan">
                {a.tag}
              </span>
              <span className="text-[13px] opacity-90">{a.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
