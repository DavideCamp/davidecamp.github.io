import { motion } from 'framer-motion';
import { Linkedin, Mail, Github } from 'lucide-react';

export const FooterSection = () => {
  return (
    <footer className="section-divider px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="surface-card p-8 md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600 dark:text-cyan-300">04 · Pricing / CTA</p>
          <h3 className="mt-4 max-w-4xl text-4xl leading-tight text-slate-900 dark:text-slate-100 md:text-6xl">Simple setup. Clear results.</h3>
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            Prenota una call di 30 minuti: analizziamo il tuo processo e identifichiamo le prime automazioni con ROI immediato.
          </p>

          <motion.a whileHover={{ x: 4 }} href="mailto:hello@automation-studio.it" className="primary-btn mt-8">
            Start for free
          </motion.a>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/65 pt-6 text-sm text-slate-500 dark:border-white/15 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Flowkit n8n</p>
          <div className="flex items-center gap-4">
            <a href="mailto:hello@automation-studio.it" className="transition hover:text-slate-900 dark:hover:text-slate-100"><Mail className="h-4 w-4" /></a>
            <a href="#" className="transition hover:text-slate-900 dark:hover:text-slate-100"><Linkedin className="h-4 w-4" /></a>
            <a href="#" className="transition hover:text-slate-900 dark:hover:text-slate-100"><Github className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
