import { ScoredRoute } from '@/lib/types';
import SensoryBadge from './SensoryBadge';
import { Clock, Footprints, Repeat, TreePine, Users} from 'lucide-react';

interface RouteCardProps {
  route: ScoredRoute;
  rank: number;
  onChoose: (route: ScoredRoute) => void;
}

export default function RouteCard({ route, rank, onChoose }: RouteCardProps) {
  return (
    <article className="bg-white border border-line rounded-card p-6 flex flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs text-inkSoft mb-1">Option {rank}</p>
          <h3 className="font-medium text-lg text-ink">{route.name}</h3>
        </div>
        <SensoryBadge score={route.scoreResult.score} label={route.scoreResult.label} />
      </div>

      <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-inkSoft">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" aria-hidden="true" />
          <dt className="sr-only">Travel time</dt>
          <dd>{route.travelTimeMinutes} min</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <Repeat className="w-4 h-4" aria-hidden="true" />
          <dt className="sr-only">Transfers</dt>
          <dd>
            {route.transfers} transfer{route.transfers === 1 ? '' : 's'}
          </dd>
        </div>
        <div className="flex items-center gap-1.5">
          <Footprints className="w-4 h-4" aria-hidden="true" />
          <dt className="sr-only">Walking distance</dt>
          <dd>{route.walkingMeters}m walking</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4" aria-hidden="true" />
          <dt className="sr-only">Crowd level</dt>
          <dd className="capitalize">
            {route.crowdLevel} crowd
          </dd>
        </div>
        {route.quietSpaceNearby && (
          <div className="flex items-center gap-1.5 text-tram-dark">
            <TreePine className="w-4 h-4" aria-hidden="true" />
            <dt className="sr-only">Nearby quiet space</dt>
            <dd>{route.quietSpaceName}</dd>
          </div>
        )}
      </dl>

      {route.scoreResult.explanation.length > 0 && (
        <div>
          <p className="text-sm font-medium text-ink mb-1.5">Why this score?</p>
          <ul className="text-sm text-inkSoft space-y-1 list-disc list-inside">
            {route.scoreResult.explanation.map((reason, i) => (
              <li key={i}>{reason}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="pt-2 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onChoose(route)}
          className="focus-ring rounded-full bg-tram px-5 py-2.5 text-sm text-white font-medium hover:bg-tram-dark transition-colors"
        >
          Choose this route
        </button>
      </div>
    </article>
  );
}
