import { QuietSpace } from '@/lib/types';
import { MapPin, Clock, Accessibility } from 'lucide-react';

interface QuietSpaceCardProps {
  space: QuietSpace;
  distanceMeters?: number;
}

export default function QuietSpaceCard({ space, distanceMeters }: QuietSpaceCardProps) {
  return (
    <article className="bg-white border border-line rounded-card p-6 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-tram-dark font-medium mb-1">{space.type}</p>
          <h3 className="font-medium text-lg text-ink">{space.name}</h3>
        </div>
        {typeof distanceMeters === 'number' && (
          <span className="shrink-0 text-sm text-inkSoft whitespace-nowrap">
            {distanceMeters < 1000 ? `${Math.round(distanceMeters)}m away` : `${(distanceMeters / 1000).toFixed(1)}km away`}
          </span>
        )}
      </div>

      <p className="text-sm text-inkSoft leading-relaxed">{space.sensoryNotes}</p>

      <dl className="text-sm text-inkSoft space-y-1.5 pt-1">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
          <dt className="sr-only">Address</dt>
          <dd>{space.address}</dd>
        </div>
        <div className="flex items-start gap-2">
          <Clock className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
          <dt className="sr-only">Opening hours</dt>
          <dd>{space.openingHours}</dd>
        </div>
        <div className="flex items-start gap-2">
          <Accessibility className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
          <dt className="sr-only">Accessibility notes</dt>
          <dd>{space.accessibilityNotes}</dd>
        </div>
      </dl>
    </article>
  );
}
