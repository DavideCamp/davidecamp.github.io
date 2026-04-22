import { motion } from 'framer-motion';
import { Check, Clock3, Link2, Mail, Split, Webhook } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
import { getRunningIndex, getWorkflowAnchorPositions, getWorkflowMarker, getWorkflowProgressFromCenters, WORKFLOW_SECTION_IDS } from './workflowState';

interface SectionHeaderProps {
  index: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  sectionId?: string;
}

type NodeType = 'trigger' | 'logic' | 'action' | 'output';
type NodeStatus = 'pending' | 'running' | 'success';

const typeBySectionId: Partial<Record<string, NodeType>> = {
  hero: 'trigger',
  'come-funziona': 'logic',
  servizi: 'action',
  'casi-uso': 'output',
  contatti: 'output',
};

const toneByType: Record<NodeType, string> = {
  trigger: 'from-blue-50 to-cyan-50 dark:from-blue-950/35 dark:to-cyan-950/30',
  logic: 'from-indigo-50 to-blue-50 dark:from-indigo-950/35 dark:to-blue-950/30',
  action: 'from-cyan-50 to-sky-50 dark:from-cyan-950/35 dark:to-sky-950/30',
  output: 'from-emerald-50 to-teal-50 dark:from-emerald-950/35 dark:to-teal-950/30',
};

const statusBadgeClass: Record<NodeStatus, string> = {
  pending: 'border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300',
  running: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-700/70 dark:bg-blue-900/45 dark:text-blue-200',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-700/70 dark:bg-emerald-900/45 dark:text-emerald-200',
};

const iconByType = {
  trigger: Webhook,
  logic: Split,
  action: Link2,
  output: Mail,
};

export const SectionHeader = ({ index, eyebrow, title, subtitle, sectionId }: SectionHeaderProps) => {
  const [runningIndex, setRunningIndex] = useState(0);

  useEffect(() => {
    if (!sectionId) return;

    const update = () => {
      const centers = getWorkflowAnchorPositions();

      if (centers.length < 2) return;

      const marker = getWorkflowMarker();
      const progress = getWorkflowProgressFromCenters(marker, centers);
      setRunningIndex(getRunningIndex(progress, centers.length));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [sectionId]);

  const sectionIndex = sectionId ? WORKFLOW_SECTION_IDS.indexOf(sectionId as (typeof WORKFLOW_SECTION_IDS)[number]) : -1;
  const status: NodeStatus = sectionIndex < 0 ? 'pending' : sectionIndex < runningIndex ? 'success' : sectionIndex === runningIndex ? 'running' : 'pending';
  const nodeType: NodeType = typeBySectionId[sectionId ?? ''] ?? 'logic';
  const Icon = iconByType[nodeType];
  const isRunning = status === 'running';

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-3xl text-center"
    >
      <div className="mx-auto inline-block text-left">
        <motion.div
          id={sectionId ? `workflow-anchor-${sectionId}` : undefined}
          className={cn(
            'relative w-[280px] rounded-2xl border bg-gradient-to-br px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_16px_30px_-20px_rgba(15,23,42,0.45)] backdrop-blur-xl md:w-[340px] md:px-5 md:py-3.5',
            toneByType[nodeType],
          )}
          animate={{ x: isRunning ? 3 : 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-md border border-white/65 bg-white/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600 backdrop-blur dark:border-white/15 dark:bg-slate-800/45 dark:text-slate-300">
              <Icon className="h-3 w-3" />
              {nodeType}
            </div>
            <div className={cn('inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em]', statusBadgeClass[status])}>
              {status === 'pending' && <Clock3 className="h-3 w-3" />}
              {status === 'running' && <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />}
              {status === 'success' && <Check className="h-3 w-3" />}
            </div>
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-cyan-300">Step {index}</p>
          <p className="mt-1.5 text-sm font-semibold leading-snug text-slate-900 dark:text-slate-100 md:text-[15px]">{eyebrow}</p>
          <p className="mt-1 text-[11px] leading-relaxed text-slate-600 dark:text-slate-300 md:text-xs">Workflow status linked to scroll progress.</p>

          {isRunning && (
            <motion.div
              className="absolute inset-0 rounded-2xl bg-blue-400/10 dark:bg-blue-300/12"
              animate={{ opacity: [0.12, 0.4, 0.12] }}
              transition={{ duration: 1.1, repeat: Infinity }}
            />
          )}
        </motion.div>
      </div>
      <h2 className="mt-4 text-balance text-4xl leading-tight text-slate-900 dark:text-slate-100 md:text-5xl">{title}</h2>
      <p className="mt-4 text-balance text-base text-slate-600 dark:text-slate-300 md:text-lg">{subtitle}</p>
    </motion.div>
  );
};
