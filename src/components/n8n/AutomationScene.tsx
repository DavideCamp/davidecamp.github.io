import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Bell, Check, Clock3, Filter, Link2, Mail, Split, Webhook } from 'lucide-react';

interface AutomationSceneProps {
  className?: string;
}

type NodeType = 'trigger' | 'logic' | 'action' | 'output';
type NodeStatus = 'pending' | 'running' | 'success';

type Position = { x: number; y: number };

interface FlowNode {
  id: string;
  x: number;
  y: number;
  title: string;
  subtitle: string;
  type: NodeType;
}

interface FlowLink {
  id: string;
  from: string;
  to: string;
  color: string;
  duration: string;
  bend: number;
}

const SVG_WIDTH = 1000;
const SVG_HEIGHT = 520;
interface AnchorPoint {
  x: number;
  y: number;
}

interface NodeAnchors {
  left: AnchorPoint;
  right: AnchorPoint;
}

const nodes: FlowNode[] = [
  { id: 'trigger', x: 8, y: 26, title: 'Webhook Trigger', subtitle: 'New Lead', type: 'trigger' },
  { id: 'filter', x: 30, y: 16, title: 'IF / Qualify', subtitle: 'Score > 70', type: 'logic' },
  { id: 'enrich', x: 30, y: 64, title: 'API Enrichment', subtitle: 'Company Data', type: 'action' },
  { id: 'crm', x: 54, y: 40, title: 'CRM Sync', subtitle: 'Create Deal', type: 'action' },
  { id: 'notify', x: 78, y: 18, title: 'Slack Notify', subtitle: 'Sales Team', type: 'output' },
  { id: 'email', x: 78, y: 66, title: 'Email Sequence', subtitle: 'Auto Follow-up', type: 'output' },
];

const links: FlowLink[] = [
  { id: 'l1', from: 'trigger', to: 'filter', color: '#3b82f6', duration: '3.4s', bend: -0.08 },
  { id: 'l2', from: 'trigger', to: 'enrich', color: '#06b6d4', duration: '3.8s', bend: 0.12 },
  { id: 'l3', from: 'filter', to: 'crm', color: '#4f46e5', duration: '3.2s', bend: -0.06 },
  { id: 'l4', from: 'enrich', to: 'crm', color: '#0ea5e9', duration: '3.7s', bend: 0.08 },
  { id: 'l5', from: 'crm', to: 'notify', color: '#3b82f6', duration: '3.1s', bend: -0.08 },
  { id: 'l6', from: 'crm', to: 'email', color: '#10b981', duration: '3.5s', bend: 0.1 },
];

const toneByType: Record<NodeType, string> = {
  trigger: 'from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/35',
  logic: 'from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-950/35',
  action: 'from-cyan-50 to-sky-50 dark:from-cyan-950/40 dark:to-sky-950/35',
  output: 'from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/35',
};

const iconByNodeId: Record<string, (props: { className?: string }) => JSX.Element> = {
  trigger: Webhook,
  filter: Filter,
  enrich: Split,
  crm: Link2,
  notify: Bell,
  email: Mail,
};

const statusLabel: Record<NodeStatus, string> = {
  pending: 'Pending',
  running: 'Running',
  success: 'Success',
};

const statusBadgeClass: Record<NodeStatus, string> = {
  pending: 'border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300',
  running: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-700/70 dark:bg-blue-900/45 dark:text-blue-200',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-700/70 dark:bg-emerald-900/45 dark:text-emerald-200',
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const NodeLiveBadge = ({ status }: { status: NodeStatus }) => {
  return (
    <div className={cn('inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em]', statusBadgeClass[status])}>
      {status === 'pending' && <Clock3 className="h-3 w-3" />}
      {status === 'running' && (
        <motion.span
          className="inline-block h-2 w-2 rounded-full bg-blue-500"
          animate={{ scale: [1, 1.45, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.05, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      {status === 'success' && <Check className="h-3 w-3" />}
      {statusLabel[status]}
    </div>
  );
};

export const AutomationScene = ({ className }: AutomationSceneProps) => {
  const [step, setStep] = useState(0);
  const [positions, setPositions] = useState<Record<string, Position>>(() => {
    const map: Record<string, Position> = {};
    nodes.forEach((node) => {
      map[node.id] = { x: node.x, y: node.y };
    });
    return map;
  });

  const dragState = useRef<{
    id: string;
    origin: Position;
    startX: number;
    startY: number;
  } | null>(null);

  const boardRef = useRef<HTMLDivElement>(null);
  const handleRefs = useRef<Record<string, { left: HTMLDivElement | null; right: HTMLDivElement | null }>>({});
  const [boardWidth, setBoardWidth] = useState(0);
  const [boardHeight, setBoardHeight] = useState(0);
  const [anchors, setAnchors] = useState<Record<string, NodeAnchors>>({});

  useEffect(() => {
    const id = setInterval(() => {
      setStep((prev) => (prev + 1) % (nodes.length + 2));
    }, 950);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const recalc = () => {
      if (!boardRef.current) return;
      const boardRect = boardRef.current.getBoundingClientRect();
      setBoardWidth(boardRect.width);
      setBoardHeight(boardRect.height);

      const next: Record<string, NodeAnchors> = {};

      nodes.forEach((node) => {
        const refs = handleRefs.current[node.id];
        if (!refs?.left || !refs?.right) return;

        const leftRect = refs.left.getBoundingClientRect();
        const rightRect = refs.right.getBoundingClientRect();

        next[node.id] = {
          left: {
            x: leftRect.left + leftRect.width / 2 - boardRect.left,
            y: leftRect.top + leftRect.height / 2 - boardRect.top,
          },
          right: {
            x: rightRect.left + rightRect.width / 2 - boardRect.left,
            y: rightRect.top + rightRect.height / 2 - boardRect.top,
          },
        };
      });

      setAnchors(next);
    };

    recalc();
    window.addEventListener('resize', recalc);

    let observer: ResizeObserver | null = null;
    if (boardRef.current) {
      observer = new ResizeObserver(recalc);
      observer.observe(boardRef.current);
    }

    return () => {
      window.removeEventListener('resize', recalc);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (!boardRef.current) return;
      const boardRect = boardRef.current.getBoundingClientRect();
      setBoardWidth(boardRect.width);
      setBoardHeight(boardRect.height);

      const next: Record<string, NodeAnchors> = {};
      nodes.forEach((node) => {
        const refs = handleRefs.current[node.id];
        if (!refs?.left || !refs?.right) return;
        const leftRect = refs.left.getBoundingClientRect();
        const rightRect = refs.right.getBoundingClientRect();
        next[node.id] = {
          left: {
            x: leftRect.left + leftRect.width / 2 - boardRect.left,
            y: leftRect.top + leftRect.height / 2 - boardRect.top,
          },
          right: {
            x: rightRect.left + rightRect.width / 2 - boardRect.left,
            y: rightRect.top + rightRect.height / 2 - boardRect.top,
          },
        };
      });
      setAnchors(next);
    });

    return () => cancelAnimationFrame(raf);
  }, [positions]);

  const nodeStatuses = useMemo(() => {
    const map: Record<string, NodeStatus> = {};

    nodes.forEach((node, index) => {
      if (step > index + 1) map[node.id] = 'success';
      else if (step === index + 1) map[node.id] = 'running';
      else map[node.id] = 'pending';
    });

    return map;
  }, [step]);

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      if (!dragState.current || !boardRef.current) return;

      const activeDrag = dragState.current;
      const rect = boardRef.current.getBoundingClientRect();
      const dx = ((event.clientX - activeDrag.startX) / rect.width) * 100;
      const dy = ((event.clientY - activeDrag.startY) / rect.height) * 100;

      const nextX = clamp(activeDrag.origin.x + dx, 8, 92);
      const nextY = clamp(activeDrag.origin.y + dy, 12, 88);

      setPositions((prev) => ({
        ...prev,
        [activeDrag.id]: { x: nextX, y: nextY },
      }));
    };

    const handleUp = () => {
      dragState.current = null;
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, []);

  const completed = Object.values(nodeStatuses).filter((s) => s === 'success').length;

  const linkPaths = useMemo(() => {
    return links.map((link) => {
      const from = anchors[link.from];
      const to = anchors[link.to];

      if (!from || !to || boardWidth === 0 || boardHeight === 0) {
        return { ...link, path: '' };
      }

      const x1 = (from.right.x / boardWidth) * SVG_WIDTH;
      const y1 = (from.right.y / boardHeight) * SVG_HEIGHT;
      const x2 = (to.left.x / boardWidth) * SVG_WIDTH;
      const y2 = (to.left.y / boardHeight) * SVG_HEIGHT;

      const cx = (x1 + x2) / 2;
      const cy = (y1 + y2) / 2 + link.bend * SVG_HEIGHT;

      return {
        ...link,
        path: `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`,
      };
    });
  }, [anchors, boardHeight, boardWidth]);

  return (
    <div className={cn('relative w-full overflow-hidden rounded-2xl border border-white/65 bg-white/28 backdrop-blur-2xl dark:border-white/12 dark:bg-slate-900/32', className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.12),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(20,184,166,0.10),transparent_35%)] dark:bg-[radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.24),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(20,184,166,0.16),transparent_35%)]" />

      <div className="relative z-10 flex items-center justify-between border-b border-white/60 bg-white/35 px-4 py-3 backdrop-blur-2xl dark:border-white/12 dark:bg-slate-900/35 md:px-6">
        <div className="flex items-center gap-3">
          <motion.div
            className="h-2.5 w-2.5 rounded-full bg-emerald-500"
            animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">n8n Workflow Builder</p>
        </div>
        <div className="pill border-emerald-200/70 bg-emerald-100/60 text-emerald-700">Drag nodes enabled</div>
      </div>

      <div ref={boardRef} className="relative z-10 h-[380px] md:h-[560px]">
        <svg preserveAspectRatio="none" viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="absolute inset-0 h-full w-full">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
            </marker>
          </defs>

          {linkPaths.map((link) => (
            <g key={link.id}>
              {!link.path ? null : (
                <>
              <path d={link.path} fill="none" stroke={link.color} strokeOpacity="0.22" strokeWidth="3" markerEnd="url(#arrow)" />
              <path d={link.path} fill="none" stroke={link.color} strokeOpacity="0.9" strokeWidth="2" strokeDasharray="8 12">
                <animate attributeName="stroke-dashoffset" from="0" to="-240" dur={link.duration} repeatCount="indefinite" />
              </path>
              <circle r="5" fill={link.color}>
                <animateMotion dur={link.duration} repeatCount="indefinite" path={link.path} />
              </circle>
                </>
              )}
            </g>
          ))}
        </svg>

        {nodes.map((node, index) => {
          const Icon = iconByNodeId[node.id];
          const status = nodeStatuses[node.id];
          const isRunning = status === 'running';
          const pos = positions[node.id];

          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 * index }}
              whileHover={{ y: -3, scale: 1.01 }}
              onPointerDown={(event) => {
                dragState.current = {
                  id: node.id,
                  origin: { x: pos.x, y: pos.y },
                  startX: event.clientX,
                  startY: event.clientY,
                };
              }}
              className={cn(
                'absolute w-[180px] cursor-grab rounded-xl border bg-gradient-to-br px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_25px_-16px_rgba(15,23,42,0.4)] backdrop-blur-xl active:cursor-grabbing md:w-[210px] md:px-4 md:py-3',
                toneByType[node.type],
              )}
              style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              <div
                ref={(el) => {
                  if (!handleRefs.current[node.id]) {
                    handleRefs.current[node.id] = { left: null, right: null };
                  }
                  handleRefs.current[node.id].left = el;
                }}
                className="pointer-events-none absolute -left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-white bg-blue-500"
              />
              <div
                ref={(el) => {
                  if (!handleRefs.current[node.id]) {
                    handleRefs.current[node.id] = { left: null, right: null };
                  }
                  handleRefs.current[node.id].right = el;
                }}
                className="pointer-events-none absolute -right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-white bg-emerald-500"
              />

              <div className="mb-2 flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5 rounded-md border border-white/65 bg-white/45 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600 backdrop-blur dark:border-white/15 dark:bg-slate-800/45 dark:text-slate-300">
                  <Icon className="h-3 w-3" />
                  {node.type}
                </div>
                <NodeLiveBadge status={status} />
              </div>

              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 md:text-[15px]">{node.title}</p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{node.subtitle}</p>

              {isRunning && (
                <motion.div
                  className="absolute inset-0 rounded-xl bg-blue-400/10 dark:bg-blue-300/12"
                  animate={{ opacity: [0.12, 0.42, 0.12] }}
                  transition={{ duration: 1.1, repeat: Infinity }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 grid grid-cols-2 border-t border-white/60 bg-white/30 px-4 py-3 text-xs text-slate-600 backdrop-blur-xl dark:border-white/12 dark:bg-slate-900/30 dark:text-slate-300 md:flex md:items-center md:justify-between md:px-6">
        <span>Execution status: {step === nodes.length + 1 ? 'Cycle complete' : 'Running'}</span>
        <span className="text-right md:text-left">Completed nodes: {completed} / {nodes.length}</span>
      </div>
    </div>
  );
};
