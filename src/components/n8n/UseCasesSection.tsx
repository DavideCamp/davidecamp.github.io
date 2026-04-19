import { motion } from 'framer-motion';
import { SectionHeader } from './SectionHeader';

const items = [
  {
    title: 'Lead generation automation',
    text: 'Dai form al CRM con scoring automatico e assegnazione al sales team.',
  },
  {
    title: 'CRM automation',
    text: 'Contatti, deal e follow-up aggiornati in tempo reale senza lavoro manuale.',
  },
  {
    title: 'E-commerce automation',
    text: 'Ordini, pagamenti e comunicazioni cliente sincronizzati tra piattaforme.',
  },
  {
    title: 'Internal workflow automation',
    text: 'Onboarding, approvazioni, report e task ricorrenti completamente orchestrati.',
  },
];

export const UseCasesSection = () => {
  return (
    <section id="casi-uso" className="section-divider px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="03"
          eyebrow="Use cases"
          title="Automation that works for real teams."
          subtitle="Casi d'uso ad alto impatto per startup, PMI e freelance che vogliono scalare con meno overhead."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {items.map((item, idx) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              whileHover={{ y: -5 }}
              className="surface-card p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">0{idx + 1}</p>
              <h3 className="mt-3 text-2xl text-slate-900 dark:text-slate-100">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
