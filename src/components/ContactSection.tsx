import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';

const EMAIL = 'ronitkundnani08@gmail.com';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [from, setFrom] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = `Portfolio contact from ${name || 'someone'}`;
    const body = `${message}\n\n— ${name}${from ? ` (${from})` : ''}`;
    const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <section id="contact" className="relative px-6 py-32 sm:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 flex flex-col items-center gap-3 text-center">
          <span className="text-[11px] uppercase tracking-[5px] text-cyan-dim">// 05</span>
          <h2 className="font-display text-3xl font-bold tracking-wide text-[#eafffb] sm:text-4xl">
            Transmit a Message
          </h2>
          <span className="border border-cyan-dim px-3 py-1 text-[10.5px] uppercase tracking-[1.5px] text-cyan">
            ● Open to robotics internships
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* terminal-style info panel */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="hud-panel flex flex-col justify-between p-7"
          >
            <div className="text-[12.5px] leading-loose">
              <p className="text-cyan-dim">ronit@mission-control:~$ whoami</p>
              <p className="mb-3">
                Robotics &amp; autonomous systems engineer-in-training — UAV navigation, ROS 2, SLAM.
              </p>
              <p className="text-cyan-dim">ronit@mission-control:~$ contact --list</p>
              <p>
                <span className="text-cyan-dim">→ email</span>{' '}
                <a className="text-cyan hover:underline" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </p>
              <p>
                <span className="text-cyan-dim">→ github</span>{' '}
                <a
                  className="text-cyan hover:underline"
                  href="https://github.com/RonitKundnani"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/RonitKundnani
                </a>
              </p>
              <p>
                <span className="text-cyan-dim">→ linkedin</span>{' '}
                <a
                  className="text-cyan hover:underline"
                  href="https://www.linkedin.com/in/ronit-kundnani"
                  target="_blank"
                  rel="noreferrer"
                >
                  linkedin.com/in/ronit-kundnani
                </a>
              </p>
              <p className="mt-3 text-cyan-dim">
                ronit@mission-control:~$ <span className="animate-pulse">▌</span>
              </p>
            </div>

            <div className="mt-8 flex gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="flex-1 border border-cyan bg-cyan-faint px-4 py-2.5 text-center text-[11px] uppercase tracking-[1.5px] text-cyan transition hover:shadow-[0_0_18px_rgba(94,234,212,0.3)]"
              >
                Email Direct
              </a>
              <a
                href="https://github.com/RonitKundnani"
                target="_blank"
                rel="noreferrer"
                className="flex-1 border border-cyan-dim px-4 py-2.5 text-center text-[11px] uppercase tracking-[1.5px] text-cyan-dim transition hover:border-cyan hover:text-cyan"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/ronit-kundnani"
                target="_blank"
                rel="noreferrer"
                className="flex-1 border border-cyan-dim px-4 py-2.5 text-center text-[11px] uppercase tracking-[1.5px] text-cyan-dim transition hover:border-cyan hover:text-cyan"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>

          {/* compose form -> opens a prefilled mailto */}
          <motion.form
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="hud-panel flex flex-col gap-4 p-7"
          >
            <span className="text-[11px] uppercase tracking-[2px] text-cyan-dim">
              Compose // Direct Transmission
            </span>

            <label className="flex flex-col gap-1.5">
              <span className="text-[10.5px] uppercase tracking-[1px] text-cyan-dim">Your name</span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-cyan-faint bg-transparent px-3 py-2.5 text-[13px] text-[#eafffb] outline-none transition focus:border-cyan"
                placeholder="Jane Doe"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[10.5px] uppercase tracking-[1px] text-cyan-dim">Your email</span>
              <input
                required
                type="email"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="border border-cyan-faint bg-transparent px-3 py-2.5 text-[13px] text-[#eafffb] outline-none transition focus:border-cyan"
                placeholder="jane@example.com"
              />
            </label>

            <label className="flex flex-1 flex-col gap-1.5">
              <span className="text-[10.5px] uppercase tracking-[1px] text-cyan-dim">Message</span>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 resize-none border border-cyan-faint bg-transparent px-3 py-2.5 text-[13px] text-[#eafffb] outline-none transition focus:border-cyan"
                placeholder="Let's talk about..."
              />
            </label>

            <button
              type="submit"
              className="border border-cyan bg-cyan-faint px-4 py-3 text-[12px] uppercase tracking-[2px] text-cyan transition hover:shadow-[0_0_18px_rgba(94,234,212,0.35)]"
            >
              {sent ? 'Opening mail client…' : 'Send Transmission →'}
            </button>
            <p className="text-[10.5px] text-cyan-dim opacity-70">
              Opens your email client with this message pre-filled to {EMAIL}.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
