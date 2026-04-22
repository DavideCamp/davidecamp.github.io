import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { getWorkflowMarker, getWorkflowProgressFromCenters } from './workflowState';

interface FlowCurvesBackgroundProps {
  className?: string;
}

interface Point {
  x: number;
  y: number;
}

const FLOW_NODE_IDS = ['come-funziona', 'servizi', 'casi-uso', 'contatti'] as const;

const buildSmoothPath = (points: Point[]) => {
  if (points.length < 2) return '';

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i += 1) {
    const prev = points[i - 1];
    const curr = points[i];
    const cy = (prev.y + curr.y) / 2;
    const direction = i % 2 === 0 ? -1 : 1;
    const curveX = (prev.x + curr.x) / 2 + direction * 120;
    d += ` C ${curveX} ${cy} ${curveX} ${cy} ${curr.x} ${curr.y}`;
  }

  return d;
};

export const FlowCurvesBackground = ({ className }: FlowCurvesBackgroundProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      if (!rootRef.current) return;

      const rootRect = rootRef.current.getBoundingClientRect();
      const rootTop = rootRect.top + window.scrollY;
      const rootLeft = rootRect.left + window.scrollX;

      const anchorEntries = FLOW_NODE_IDS
        .map((id) => {
          const anchor = document.getElementById(`workflow-anchor-${id}`) ?? document.getElementById(id);
          if (!anchor) return null;
          const rect = anchor.getBoundingClientRect();
          return { id, rect };
        })
        .filter((entry): entry is { id: string; rect: DOMRect } => Boolean(entry));

      const nextPoints = anchorEntries.map((entry) => ({
        x: entry.rect.left + window.scrollX + entry.rect.width * 0.5 - rootLeft,
        y: entry.rect.top + window.scrollY + entry.rect.height * 0.5 - rootTop,
      }));

      const anchorY = anchorEntries.map((entry) => entry.rect.top + window.scrollY);

      if (anchorY.length >= 2) {
        const marker = getWorkflowMarker();
        const rawProgress = getWorkflowProgressFromCenters(marker, anchorY);
        const pageBottomReached = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
        setProgress(pageBottomReached ? 1 : rawProgress);
      } else {
        setProgress(0);
      }

      setPoints(nextPoints);
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

  const path = useMemo(() => buildSmoothPath(points), [points]);
  const pathProgress = Math.max(0, Math.min(progress, 1));

  return (
    <div ref={rootRef} className={cn('pointer-events-none absolute inset-0 z-0 overflow-hidden', className)} aria-hidden>
      <svg className="h-full w-full">
        <defs>
          <linearGradient id="flow-connector" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(59,130,246,0.22)" />
            <stop offset="45%" stopColor="rgba(34,211,238,0.28)" />
            <stop offset="100%" stopColor="rgba(16,185,129,0.22)" />
          </linearGradient>
        </defs>

        {!path ? null : (
          <>
            <path d={path} fill="none" stroke="rgba(148,163,184,0.16)" strokeWidth="2.5" strokeLinecap="round" />
            <path
              d={path}
              fill="none"
              stroke="url(#flow-connector)"
              strokeWidth="2.1"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={`${pathProgress} 1`}
            />
            <path d={path} fill="none" stroke="url(#flow-connector)" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="7 11">
              <animate attributeName="stroke-dashoffset" from="0" to="-180" dur="14s" repeatCount="indefinite" />
            </path>
          </>
        )}
      </svg>
    </div>
  );
};
