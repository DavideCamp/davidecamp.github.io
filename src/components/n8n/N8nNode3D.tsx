import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber';
import { QuadraticBezierLine, RoundedBox } from '@react-three/drei';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { cn } from '../../lib/utils';

interface N8nNode3DProps {
  title?: string;
  inputCount?: number;
  outputCount?: number;
  headerColor?: string;
  bodyColor?: string;
  className?: string;
}

type Vec3 = [number, number, number];

interface WorkflowNode {
  id: string;
  title: string;
  position: Vec3;
}

interface NodeTheme {
  header: string;
  body: string;
  input: string;
  output: string;
  status: string;
  line: string;
}

const buildPortOffsets = (count: number, spacing = 0.2) => {
  const safeCount = Math.max(1, count);
  const center = (safeCount - 1) / 2;
  return Array.from({ length: safeCount }, (_, index) => (center - index) * spacing);
};

const createLabelTexture = (text: string) => {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;

  const context = canvas.getContext('2d');
  if (!context) return null;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#e2e8f0';
  context.font = '700 132px Inter, Arial, sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 4;
  texture.needsUpdate = true;

  return texture;
};

interface NodeCardProps {
  title: string;
  position: Vec3;
  onPositionChange: (next: Vec3) => void;
  inputCount: number;
  outputCount: number;
  headerColor: string;
  bodyColor: string;
  inputColor: string;
  outputColor: string;
  statusColor: string;
}

const NodeCard = ({
  title,
  position,
  onPositionChange,
  inputCount,
  outputCount,
  headerColor,
  bodyColor,
  inputColor,
  outputColor,
  statusColor,
}: NodeCardProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const isDragging = useRef(false);
  const dragOffset = useRef(new THREE.Vector3());
  const dragPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const planeHit = useRef(new THREE.Vector3());

  const width = 1.18;
  const height = 0.66;
  const depth = 0.11;
  const headerHeight = 0.19;

  const labelMap = useMemo(() => createLabelTexture(title), [title]);
  const inputOffsets = useMemo(() => buildPortOffsets(inputCount, 0.18), [inputCount]);
  const outputOffsets = useMemo(() => buildPortOffsets(outputCount, 0.18), [outputCount]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    if (isDragging.current) return;

    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.8 + position[0]) * 0.05;
    groupRef.current.rotation.x = Math.sin(t * 0.65 + position[1]) * 0.02;
    groupRef.current.position.y = position[1] + Math.sin(t * 0.95 + position[0]) * 0.018;
  });

  const onPointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    isDragging.current = true;
    event.target.setPointerCapture(event.pointerId);

    if (event.ray.intersectPlane(dragPlane, planeHit.current)) {
      dragOffset.current.set(position[0] - planeHit.current.x, position[1] - planeHit.current.y, 0);
    }
  };

  const onPointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!isDragging.current) return;

    if (event.ray.intersectPlane(dragPlane, planeHit.current)) {
      const x = THREE.MathUtils.clamp(planeHit.current.x + dragOffset.current.x, -1.7, 1.7);
      const y = THREE.MathUtils.clamp(planeHit.current.y + dragOffset.current.y, -1.05, 1.05);
      onPositionChange([x, y, 0]);
    }
  };

  const onPointerUp = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    isDragging.current = false;
    event.target.releasePointerCapture(event.pointerId);
  };

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerOut={onPointerUp}
    >
      <RoundedBox args={[width, height, depth]} radius={0.1} smoothness={6} castShadow receiveShadow>
        <meshPhysicalMaterial color={bodyColor} metalness={0.02} roughness={0.18} transmission={0.52} transparent opacity={0.92} thickness={0.38} envMapIntensity={0.55} clearcoat={1} clearcoatRoughness={0.25} />
      </RoundedBox>

      <RoundedBox args={[width * 0.97, headerHeight, depth * 1.02]} radius={0.08} smoothness={6} position={[0, height / 2 - headerHeight / 2, 0.01]}>
        <meshPhysicalMaterial color={headerColor} metalness={0.04} roughness={0.16} transmission={0.38} transparent opacity={0.95} clearcoat={0.9} clearcoatRoughness={0.16} />
      </RoundedBox>

      {labelMap && (
        <sprite position={[0, -0.01, depth / 2 + 0.022]} scale={[0.64, 0.14, 1]}>
          <spriteMaterial map={labelMap} transparent depthWrite={false} toneMapped={false} />
        </sprite>
      )}

      <mesh position={[width / 2 - 0.11, height / 2 - headerHeight / 2, depth / 2 + 0.025]}>
        <sphereGeometry args={[0.028, 16, 16]} />
        <meshStandardMaterial color={statusColor} emissive={statusColor} emissiveIntensity={0.9} />
      </mesh>

      {inputOffsets.map((offset, index) => (
        <mesh key={`input-${index}`} position={[-width / 2 - 0.045, offset, depth / 2 - 0.018]}>
          <sphereGeometry args={[0.036, 16, 16]} />
          <meshStandardMaterial color={inputColor} emissive={inputColor} emissiveIntensity={0.14} metalness={0.14} roughness={0.28} />
        </mesh>
      ))}

      {outputOffsets.map((offset, index) => (
        <mesh key={`output-${index}`} position={[width / 2 + 0.045, offset, depth / 2 - 0.018]}>
          <sphereGeometry args={[0.036, 16, 16]} />
          <meshStandardMaterial color={outputColor} emissive={outputColor} emissiveIntensity={0.16} metalness={0.14} roughness={0.28} />
        </mesh>
      ))}
    </group>
  );
};

const linkStart = (position: Vec3): Vec3 => [position[0] + 0.64, position[1], position[2] + 0.06];
const linkEnd = (position: Vec3): Vec3 => [position[0] - 0.64, position[1], position[2] + 0.06];

export const N8nNode3D = ({
  title = 'Webhook',
  inputCount = 1,
  outputCount = 2,
  headerColor = '#3b82f6',
  bodyColor = '#0f172a',
  className,
}: N8nNode3DProps) => {
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    { id: 'a', title, position: [-1.18, 0.45, 0] },
    { id: 'b', title: 'Filter', position: [0, 0, 0] },
    { id: 'c', title: 'Notify', position: [1.18, -0.44, 0] },
  ]);

  const updateNodePosition = (id: string, nextPosition: Vec3) => {
    setNodes((prev) => prev.map((node) => (node.id === id ? { ...node, position: nextPosition } : node)));
  };

  const [first, second, third] = nodes;
  const themes: NodeTheme[] = [
    { header: headerColor, body: bodyColor, input: '#7dd3fc', output: '#60a5fa', status: '#34d399', line: '#7dd3fc' },
    { header: '#06b6d4', body: '#0b1d31', input: '#67e8f9', output: '#22d3ee', status: '#22c55e', line: '#67e8f9' },
    { header: '#14b8a6', body: '#0f2530', input: '#5eead4', output: '#2dd4bf', status: '#10b981', line: '#5eead4' },
  ];

  return (
    <div className={cn('relative h-[240px] w-full overflow-hidden rounded-2xl border border-white/20 bg-slate-950/85', className)}>
      <Canvas camera={{ position: [0, 0.08, 4.4], fov: 31 }} dpr={[1, 1.8]} shadows>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 4.5, 9]} />

        <ambientLight intensity={0.58} />
        <directionalLight position={[2.2, 3.2, 2.7]} intensity={1.1} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
        <pointLight position={[-2.6, 0.8, 2.2]} intensity={0.62} color="#38bdf8" />
        <pointLight position={[2.2, -0.7, 2.2]} intensity={0.56} color="#14b8a6" />

        <QuadraticBezierLine
          start={linkStart(first.position)}
          end={linkEnd(second.position)}
          mid={[((first.position[0] + second.position[0]) / 2) - 0.1, (first.position[1] + second.position[1]) / 2 + 0.22, 0.12]}
          color={themes[0].line}
          lineWidth={1.9}
          transparent
          opacity={0.82}
        />
        <QuadraticBezierLine
          start={linkStart(second.position)}
          end={linkEnd(third.position)}
          mid={[((second.position[0] + third.position[0]) / 2) + 0.05, (second.position[1] + third.position[1]) / 2 + 0.2, 0.12]}
          color={themes[2].line}
          lineWidth={1.9}
          transparent
          opacity={0.82}
        />

        {nodes.map((node, index) => (
          <NodeCard
            key={node.id}
            title={node.title}
            position={node.position}
            onPositionChange={(next) => updateNodePosition(node.id, next)}
            inputCount={index === 0 ? inputCount : 1}
            outputCount={index === 2 ? 1 : outputCount}
            headerColor={themes[index].header}
            bodyColor={themes[index].body}
            inputColor={themes[index].input}
            outputColor={themes[index].output}
            statusColor={themes[index].status}
          />
        ))}
      </Canvas>
    </div>
  );
};
