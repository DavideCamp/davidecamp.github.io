import { motion } from 'framer-motion';

const text = 'Meno attività manuali • Più tempo per vendite e clienti • Workflow su misura • Integrazioni API •';

export const MarqueeStrip = () => {
  return (
    <div className="overflow-hidden border-b border-white/60 bg-white/30 py-3 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/30">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
        className="flex min-w-max items-center gap-8 text-xs font-medium uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400"
      >
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </motion.div>
    </div>
  );
};
