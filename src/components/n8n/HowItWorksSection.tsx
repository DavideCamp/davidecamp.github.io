import { motion } from 'framer-motion';
import { UserPlus, Mail, BarChart3 } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

const steps = [
  {
    icon: UserPlus,
    title: 'Mappiamo il processo',
    copy: 'Analizziamo dove perdi tempo: passaggi manuali, colli di bottiglia e tool scollegati.',
  },
  {
    icon: Mail,
    title: 'Costruiamo il workflow',
    copy: 'Definiamo trigger, regole e integrazioni per far lavorare i sistemi in automatico.',
  },
  {
    icon: BarChart3,
    title: 'Misuriamo i risultati',
    copy: 'Monitoriamo tempi, errori e output per migliorare continuamente il flusso.',
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="come-funziona" className="section-divider px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="01"
          eyebrow="Come funziona"
          title="Un metodo semplice, orientato al risultato."
          subtitle="In pochi step passiamo dall’analisi al rilascio di automazioni concrete, stabili e misurabili."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="surface-card p-6"
              >
                <div className="mb-5 inline-flex rounded-xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-500/15 dark:text-blue-200">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">{index + 1}</p>
                <h3 className="mt-2 text-2xl text-slate-900 dark:text-slate-100">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{step.copy}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
