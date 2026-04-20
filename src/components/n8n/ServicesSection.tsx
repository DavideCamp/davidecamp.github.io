import { motion } from 'framer-motion';
import { SectionHeader } from './SectionHeader';
import { ServicesOutcomePanel } from './ServicesOutcomePanel';

const features = [
  {
    title: 'Automazioni personalizzate',
    text: 'Flussi su misura in base ai tuoi processi e agli strumenti che usi ogni giorno.',
  },
  {
    title: 'Integrazione API',
    text: 'Connessioni stabili con CRM, ERP, e-commerce e stack marketing.',
  },
  {
    title: 'Ottimizzazione processi',
    text: 'Riduci tempi operativi e colli di bottiglia con orchestration intelligente.',
  },
  {
    title: 'Supporto continuativo',
    text: 'Monitoraggio, fix e miglioramenti iterativi per mantenere il flusso efficiente.',
  },
];

export const ServicesSection = () => {
  return (
    <section id="servizi" className="section-divider px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="02"
          eyebrow="Servizi"
          title="Automazioni pensate per il tuo contesto reale."
          subtitle="Non template standard: progettiamo flussi su misura in base ai tuoi obiettivi operativi e commerciali."
        />

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-[1fr_1.05fr]">
          <div className="grid gap-4">
            {features.map((feature, index) => (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                whileHover={{ y: -4 }}
                className="surface-card p-5"
              >
                <h3 className="text-xl text-slate-900 dark:text-slate-100">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{feature.text}</p>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
            className="surface-card p-5"
          >
            <ServicesOutcomePanel />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
