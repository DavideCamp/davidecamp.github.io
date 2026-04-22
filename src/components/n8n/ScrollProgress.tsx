import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { getRunningIndex, getWorkflowProgressFromCenters } from './workflowState';

interface DotPoint {
  id: string;
  x: number;
  y: number;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const ScrollProgress = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState<DotPoint[]>([]);

  useEffect(() => {
    const update = () => {
      const navLinks = Array.from(document.querySelectorAll('header nav a[data-progress-id]')) as HTMLAnchorElement[];
      if (!navLinks.length || !rootRef.current) {
        setDots([]);
        setProgress(0);
        return;
      }

      const rootRect = rootRef.current.getBoundingClientRect();
      const nextDots = navLinks
        .map((link) => {
          const id = link.dataset.progressId;
          if (!id) return null;
          const rect = link.getBoundingClientRect();
          return {
            id,
            x: rect.left + rect.width * 0.5 - rootRect.left,
            y: rootRect.height / 2,
          };
        })
        .filter((item): item is DotPoint => item !== null);

      const sectionCenters = nextDots
        .map((item) => document.getElementById(item.id))
        .filter((el): el is HTMLElement => Boolean(el))
        .map((el) => {
          const rect = el.getBoundingClientRect();
          return rect.top + window.scrollY;
        });

      if (nextDots.length < 2 || sectionCenters.length < 2) {
        setDots(nextDots);
        setProgress(0);
        return;
      }

      const topBar = document.querySelector('header');
      const topBarHeight = topBar ? topBar.getBoundingClientRect().height : 0;
      const marker = window.scrollY + topBarHeight + 28;
      const rawProgress = getWorkflowProgressFromCenters(marker, sectionCenters);
      const pageBottomReached = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      setProgress(pageBottomReached ? 1 : rawProgress);
      setDots(nextDots);
    };

    update();
    const raf = requestAnimationFrame(update);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const runningIndex = getRunningIndex(progress, dots.length);
  const firstX = dots[0]?.x ?? 0;
  const lastX = dots[dots.length - 1]?.x ?? 0;
  const trackWidth = Math.max(lastX - firstX, 0);
  const fillWidth = clamp(trackWidth * progress, 0, trackWidth);

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px]">
      <motion.div style={{ scaleX: clamp(progress, 0, 1) }} className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-blue-500 to-cyan-400 md:hidden" />

      {dots.length > 1 && (
        <div className="absolute inset-0 hidden md:block">
          <div className="absolute h-[2px] rounded-full bg-slate-300/70 dark:bg-slate-600/70" style={{ left: firstX, width: trackWidth }} />
          <div className="absolute h-[2px] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ left: firstX, width: fillWidth }} />

          {dots.map((dot, index) => {
            const isRunning = index === runningIndex;
            const isSuccess = index < runningIndex;
            return (
              <motion.span
                key={dot.id}
                className={cn(
                  'absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-[3px] rounded-full border border-white/80 shadow-[0_0_0_2px_rgba(255,255,255,0.2)] dark:border-slate-950 dark:shadow-[0_0_0_2px_rgba(2,6,23,0.5)]',
                  isSuccess ? 'bg-emerald-500' : isRunning ? 'bg-blue-500' : 'bg-slate-400 dark:bg-slate-500',
                )}
                style={{ left: dot.x }}
                animate={isRunning ? { scale: [1, 1.35, 1], opacity: [0.65, 1, 0.65] } : { scale: 1, opacity: 1 }}
                transition={{ duration: 1.05, repeat: isRunning ? Infinity : 0 }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
