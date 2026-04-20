import { motion } from 'framer-motion';
import { SectionHeader } from './SectionHeader';
import { ArrowRight, ChartColumnIncreasing, Check, Clock3, MessageSquareDot, ShoppingCart, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

type NodeStatus = 'pending' | 'running' | 'success';

const statusClass: Record<NodeStatus, string> = {
  pending: 'border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300',
  running: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-700/70 dark:bg-blue-900/45 dark:text-blue-200',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-700/70 dark:bg-emerald-900/45 dark:text-emerald-200',
};

const items = [
  {
    icon: Users,
    title: 'Lead generation automation',
    when: 'Hai molti lead da ads o form, ma il team commerciale risponde in ritardo o in modo non uniforme.',
    flowNodes: ['Lead da form', 'Lead scoring', 'Assegnazione commerciale', 'Follow-up automatico'],
    result: 'Riduci il tempo di risposta e aumenti il tasso di lead qualificati che arrivano in call.',
    idealFor: 'Agenzie, consulenti, team B2B sales',
  },
  {
    icon: MessageSquareDot,
    title: 'CRM automation',
    when: 'Il CRM viene aggiornato manualmente e la pipeline non rappresenta la situazione reale.',
    flowNodes: ['Evento email/meeting', 'Update contatto/deal', 'Reminder task', 'Alert su stalli'],
    result: 'Pipeline più affidabile, forecast migliore e meno attività ripetitive per account e sales.',
    idealFor: 'PMI, founder-led sales, account team',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce automation',
    when: 'Ordini, pagamenti, stock e notifiche cliente sono distribuiti su strumenti separati.',
    flowNodes: ['Nuovo ordine', 'Sync ERP/CRM', 'Update stock', 'Notifica cliente'],
    result: 'Meno errori operativi e customer experience più fluida nel post-acquisto.',
    idealFor: 'Brand D2C, Shopify/WooCommerce store',
  },
  {
    icon: ChartColumnIncreasing,
    title: 'Internal workflow automation',
    when: 'Onboarding, approvazioni e report interni richiedono troppi passaggi manuali e follow-up.',
    flowNodes: ['Trigger interno', 'Raccolta dati', 'Approvazione step', 'Report automatico'],
    result: 'Riduci tempi operativi interni e liberi ore del team ogni settimana.',
    idealFor: 'Operations, HR, amministrazione',
  },
];

const getStatus = (phase: number, index: number): NodeStatus => {
  if (phase > index + 1) return 'success';
  if (phase === index + 1) return 'running';
  return 'pending';
};

const FlowNodePill = ({ label, status }: { label: string; status: NodeStatus }) => {
  return (
    <div className={`relative inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-[11px] font-medium ${statusClass[status]}`}>
      {status === 'running' && (
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-blue-500"
          animate={{ scale: [1, 1.45, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
      {status === 'pending' && <Clock3 className="h-3 w-3" />}
      {status === 'success' && <Check className="h-3 w-3" />}
      <span>{label}</span>
    </div>
  );
};

export const UseCasesSection = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 900);

    return () => clearInterval(id);
  }, []);

  return (
    <section id="casi-uso" className="section-divider px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="03"
          eyebrow="Use cases"
          title="Capisci in 30 secondi quale automazione ti serve"
          subtitle="Ogni caso d'uso è spiegato in modo pratico: quando applicarlo, quale flusso attivare e quale impatto aspettarti."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {items.map((item, idx) => {
            const Icon = item.icon;
            const phase = (tick + idx) % (item.flowNodes.length + 2);

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

                <div className="mt-4 space-y-4 text-sm leading-relaxed">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Quando ti serve</p>
                    <p className="mt-1 text-slate-700 dark:text-slate-300">{item.when}</p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Flusso consigliato (live)</p>
                    <div className="mt-2 rounded-lg border border-white/70 bg-white/45 p-2.5 backdrop-blur dark:border-white/15 dark:bg-slate-800/45">
                      <div className="flex flex-wrap items-center gap-2">
                        {item.flowNodes.map((node, nodeIdx) => (
                          <div key={node} className="flex items-center gap-2">
                            <FlowNodePill label={node} status={getStatus(phase, nodeIdx)} />
                            {nodeIdx < item.flowNodes.length - 1 && (
                              <ArrowRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
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
