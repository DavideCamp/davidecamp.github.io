import { motion } from 'framer-motion';
import { SectionHeader } from './SectionHeader';
import { ArrowRight, ChartColumnIncreasing, MessageSquareDot, ShoppingCart, Users } from 'lucide-react';

const items = [
  {
    icon: Users,
    title: 'Lead generation automation',
    when: 'Hai molti lead da ads o form, ma il team commerciale risponde in ritardo o in modo non uniforme.',
    flow: 'Form/Webhook -> lead scoring -> assegnazione automatica al commerciale giusto -> follow-up immediato.',
    result: 'Riduci il tempo di risposta e aumenti il tasso di lead qualificati che arrivano in call.',
    idealFor: 'Agenzie, consulenti, team B2B sales',
  },
  {
    icon: MessageSquareDot,
    title: 'CRM automation',
    when: 'Il CRM viene aggiornato manualmente e la pipeline non rappresenta la situazione reale.',
    flow: 'Eventi email/meeting/task -> update automatico contatti e deal -> reminder al team -> alert su stalli.',
    result: 'Pipeline più affidabile, forecast migliore e meno attività ripetitive per account e sales.',
    idealFor: 'PMI, founder-led sales, account team',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce automation',
    when: 'Ordini, pagamenti, stock e notifiche cliente sono distribuiti su strumenti separati.',
    flow: 'Nuovo ordine -> sync ERP/CRM -> update stock -> email/SMS cliente su stato ordine e spedizione.',
    result: 'Meno errori operativi e customer experience più fluida nel post-acquisto.',
    idealFor: 'Brand D2C, Shopify/WooCommerce store',
  },
  {
    icon: ChartColumnIncreasing,
    title: 'Internal workflow automation',
    when: 'Onboarding, approvazioni e report interni richiedono troppi passaggi manuali e follow-up.',
    flow: 'Trigger interno -> raccolta dati -> approvazione multi-step -> report automatico ai responsabili.',
    result: 'Riduci tempi operativi interni e liberi ore del team ogni settimana.',
    idealFor: 'Operations, HR, amministrazione',
  },
];

export const UseCasesSection = () => {
  return (
    <section id="casi-uso" className="section-divider px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="03"
          eyebrow="Use cases"
          title="Capisci in 30 secondi quale automazione ti serve"
          subtitle="Ogni caso d'uso è spiegato in modo pratico: quando usarlo, che flusso implementare e che risultato aspettarti."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {items.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                whileHover={{ y: -5 }}
                className="surface-card p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/45 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600 backdrop-blur dark:border-white/15 dark:bg-slate-800/45 dark:text-slate-300">
                    <Icon className="h-3.5 w-3.5" />
                    Use case 0{idx + 1}
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                </div>

                <h3 className="mt-4 text-2xl text-slate-900 dark:text-slate-100">{item.title}</h3>

                <div className="mt-4 space-y-3 text-sm leading-relaxed">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Quando ti serve</p>
                    <p className="mt-1 text-slate-700 dark:text-slate-300">{item.when}</p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Flusso consigliato</p>
                    <p className="mt-1 text-slate-700 dark:text-slate-300">{item.flow}</p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Risultato atteso</p>
                    <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">{item.result}</p>
                  </div>
                </div>

                <div className="mt-5 rounded-lg border border-white/70 bg-white/45 px-3 py-2 text-xs text-slate-600 backdrop-blur dark:border-white/15 dark:bg-slate-800/45 dark:text-slate-300">
                  <span className="font-semibold">Ideale per:</span> {item.idealFor}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
