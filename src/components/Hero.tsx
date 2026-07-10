import { motion } from 'framer-motion';
import HUDChrome from './HUDChrome';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <HUDChrome />

      <div className="pointer-events-none absolute left-0 right-0 top-0 flex items-center justify-between px-7 pt-6 text-[11px] uppercase tracking-[3px] text-cyan-dim sm:px-12">
        <span className="flex items-center gap-2">
          <span className="animate-pulse text-amber">●</span> SYSTEM ONLINE
        </span>
        <span className="hidden sm:inline">23.0225° N, 72.5714° E — AHMEDABAD</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center gap-4"
      >
        <span className="text-[11px] uppercase tracking-[6px] text-cyan opacity-85">
          Autonomous Systems // Mission Control
        </span>
        <h1 className="font-display text-[clamp(2.4rem,8vw,5.2rem)] font-black tracking-wide text-[#eafffb] [text-shadow:0_0_24px_rgba(94,234,212,0.35),0_0_60px_rgba(94,234,212,0.12)]">
          RONIT KUNDNANI
        </h1>
        <p className="max-w-xl text-[15px] leading-relaxed text-[#cfe9e4] opacity-85">
          Robotics &amp; autonomous systems engineer-in-training — <b className="font-normal text-cyan">UAV navigation</b>,{' '}
          <b className="font-normal text-cyan">ROS 2</b>, <b className="font-normal text-cyan">SLAM</b>, sensor fusion.
          Hardware-software lead on an <b className="font-normal text-cyan">ISRO IRoC-U 2026</b> GPS-denied drone team.
        </p>
        <div className="mt-3 flex gap-4">
          <a
            href="#projects"
            className="border border-cyan bg-cyan-faint px-7 py-3 text-[13px] uppercase tracking-[2px] text-cyan transition hover:shadow-[0_0_18px_rgba(94,234,212,0.35)]"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="border border-cyan-dim px-7 py-3 text-[13px] uppercase tracking-[2px] text-cyan transition hover:bg-cyan-faint hover:shadow-[0_0_18px_rgba(94,234,212,0.35)]"
          >
            Contact
          </a>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-24 left-7 right-7 flex flex-wrap justify-between gap-2 border-t border-cyan-faint pt-3.5 text-[10.5px] uppercase tracking-[1.5px] text-cyan-dim sm:px-2">
        <span>
          GPS <b className="font-normal text-cyan">DENIED · ORB-SLAM3 ACTIVE</b>
        </span>
        <span>
          ATE RMSE <b className="font-normal text-cyan">0.16 m</b>
        </span>
        <span>
          STATUS <b className="font-normal text-cyan">ELIMINATION ROUND</b>
        </span>
      </div>
    </section>
  );
}
