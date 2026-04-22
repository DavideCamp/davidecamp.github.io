import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
import { getRunningIndex, getWorkflowAnchorPositions, getWorkflowMarker, getWorkflowProgressFromCenters } from './workflowState';

interface WorkflowBackgroundRailProps {
  className?: string;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const WorkflowBackgroundRail = ({ className }: WorkflowBackgroundRailProps) => {
  const [sectionCenters, setSectionCenters] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [isNarrowDesktop, setIsNarrowDesktop] = useState(false);
  const railLeft = isNarrowDesktop ? 14 : 24;

  useEffect(() => {
    const update = () => {
      setIsNarrowDesktop(window.innerWidth < 1200);
      const centers = getWorkflowAnchorPositions();

      if (centers.length < 2) {
        setSectionCenters([]);
        setProgress(0);
        return;
      }

      setSectionCenters(centers);
      const marker = getWorkflowMarker();
      setProgress(getWorkflowProgressFromCenters(marker, centers));
    };

    update();
    const raf = requestAnimationFrame(update);

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('load', update);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      window.removeEventListener('load', update);
    };
  }, []);

  if (sectionCenters.length < 2) {
    return <div className={cn('pointer-events-none absolute inset-0 z-0 hidden md:block', className)} aria-hidden />;
  }

  const runningIndex = getRunningIndex(progress, sectionCenters.length);
  const lineTop = sectionCenters[0];
  const lineHeight = Math.max(sectionCenters[sectionCenters.length - 1] - lineTop, 0);
  const progressHeight = clamp(lineHeight * progress, 0, lineHeight);

  return (
    <div className={cn('pointer-events-none absolute inset-0 z-0 hidden md:block', className)} aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_7%_30%,rgba(59,130,246,0.12),transparent_34%),radial-gradient(circle_at_9%_75%,rgba(20,184,166,0.11),transparent_30%)] dark:bg-[radial-gradient(circle_at_7%_30%,rgba(59,130,246,0.2),transparent_34%),radial-gradient(circle_at_9%_75%,rgba(20,184,166,0.18),transparent_30%)]" />

      <div className="absolute w-[2px] rounded-full bg-slate-300/35 dark:bg-slate-600/35" style={{ left: railLeft, top: lineTop, height: lineHeight }} />
      <div
        className="absolute w-[2px] rounded-full bg-gradient-to-b from-blue-400 via-cyan-400 to-emerald-400"
        style={{ left: railLeft, top: lineTop, height: progressHeight }}
      />

      {sectionCenters.map((y, index) => {
        const isSuccess = index < runningIndex;
        const isRunning = index === runningIndex;

        return (
          <motion.span
            key={`${index}-${y}`}
            className={cn(
              'absolute z-20 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 shadow-[0_0_0_3px_rgba(255,255,255,0.25)] dark:border-white/30 dark:shadow-[0_0_0_3px_rgba(2,6,23,0.45)]',
              isSuccess ? 'bg-emerald-500' : isRunning ? 'bg-blue-500' : 'bg-slate-400 dark:bg-slate-500',
            )}
            style={{ left: railLeft, top: y }}
            animate={isRunning ? { scale: [1, 1.4, 1], opacity: [0.65, 1, 0.65] } : { scale: 1, opacity: 1 }}
            transition={{ duration: 1.05, repeat: isRunning ? Infinity : 0 }}
          />
        );
      })}
    </div>
  );
};
