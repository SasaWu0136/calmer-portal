import { SensoryLabel } from '@/lib/types';
import CalmWave from './CalmWave';
import clsx from 'clsx';

interface SensoryBadgeProps {
  score: number;
  label: SensoryLabel;
  size?: 'sm' | 'md' | 'lg';
}

const LABEL_STYLES: Record<SensoryLabel, { text: string; bg: string; wave: string }> = {
  'Low sensory load': { text: 'text-tram-dark', bg: 'bg-tram-light', wave: '#2C4F42' },
  'Medium sensory load': { text: 'text-dusk-dark', bg: 'bg-dusk-light', wave: '#3F4A6B' },
  'High sensory load': { text: 'text-caution-dark', bg: 'bg-caution-light', wave: '#8A5726' },
  'Very high sensory load': { text: 'text-caution-dark', bg: 'bg-caution-light', wave: '#8A5726' }
};

const SIZES = {
  sm: { wave: { width: 72, height: 22 }, text: 'text-xs', pad: 'px-2.5 py-1' },
  md: { wave: { width: 110, height: 30 }, text: 'text-sm', pad: 'px-3 py-1.5' },
  lg: { wave: { width: 160, height: 42 }, text: 'text-base', pad: 'px-4 py-2' }
};

export default function SensoryBadge({ score, label, size = 'md' }: SensoryBadgeProps) {
  const styles = LABEL_STYLES[label];
  const sizing = SIZES[size];

  return (
    <span className={clsx('inline-flex items-center gap-2 rounded-full', styles.bg, sizing.pad)}>
      <CalmWave score={score} width={sizing.wave.width} height={sizing.wave.height} strokeColor={styles.wave} />
      <span className={clsx('font-medium whitespace-nowrap', styles.text, sizing.text)}>{label}</span>
    </span>
  );
}
