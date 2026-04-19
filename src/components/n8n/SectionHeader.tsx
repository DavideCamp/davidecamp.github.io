import { motion } from 'framer-motion';

interface SectionHeaderProps {
  index: string;
  eyebrow: string;
  title: string;
  subtitle: string;
}

export const SectionHeader = ({ index, eyebrow, title, subtitle }: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-3xl text-center"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-cyan-300">{index} · {eyebrow}</p>
      <h2 className="mt-4 text-balance text-4xl leading-tight text-slate-900 dark:text-slate-100 md:text-5xl">{title}</h2>
      <p className="mt-4 text-balance text-base text-slate-600 dark:text-slate-300 md:text-lg">{subtitle}</p>
    </motion.div>
  );
};
