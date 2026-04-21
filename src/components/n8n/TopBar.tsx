import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollProgress } from './ScrollProgress';
import { Moon, Sun } from 'lucide-react';

const menu = [
  { label: 'Come funziona', href: '#come-funziona' },
  { label: 'Servizi', href: '#servizi' },
  { label: 'Casi d’uso', href: '#casi-uso' },
  { label: 'Contatti', href: '#contatti' },
];

interface TopBarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export const TopBar = ({ isDark, onToggleTheme }: TopBarProps) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 180], [0, -2]);

  return (
    <motion.header style={{ y }} className="sticky top-0 z-50 border-b border-white/60 bg-white/35 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/45">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-blue-600 to-cyan-500" />
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Flowkit Automazioni</span>
        </div>

        <nav className="hidden items-center gap-7 md:flex">
          {menu.map((item) => (
            <a key={item.label} href={item.href} className="text-sm text-slate-600/95 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            className="soft-btn px-3 py-2.5 text-xs md:text-sm dark:border-white/15 dark:bg-slate-800/60 dark:text-slate-100"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a href="#contatti" className="primary-btn !py-0 text-center text-xs md:text-sm">
            Prenota una call
          </a>
        </div>

        <ScrollProgress />
      </div>
    </motion.header>
  );
};
