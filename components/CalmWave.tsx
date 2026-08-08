interface CalmWaveProps {
  score: number;
  width?: number;
  height?: number;
  className?: string;
  strokeColor?: string;
}

/**
 * Renders the sensory score as a waveform: a nearly flat, slow line for a
 * calm route, rising to sharp, dense peaks for a high sensory load. This is
 * the app's one signature visual motif - it reappears (at different sizes)
 * on the landing page, route cards, and results.
 */
export default function CalmWave({ score, width = 160, height = 40, className, strokeColor }: CalmWaveProps) {
  const clamped = Math.min(Math.max(score, 0), 12);
  const amplitude = 2 + (clamped / 12) * (height / 2 - 4);
  const frequency = 1 + (clamped / 12) * 5;
  const points = 64;

  let d = '';
  for (let i = 0; i <= points; i++) {
    const x = (i / points) * width;
    const t = (i / points) * Math.PI * 2 * frequency;
    const y = height / 2 + Math.sin(t) * amplitude;
    d += i === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={className}
      role="presentation"
      aria-hidden="true"
    >
      <path d={d} fill="none" stroke={strokeColor ?? 'currentColor'} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
