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
    <article className="surface-card overflow-hidden rounded-[1.5rem] p-5 sm:p-7 flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
        <div>
          <p className="text-xs text-inkSoft mb-1">Option {rank}</p>
          <h3 className="font-medium text-lg text-ink">{route.name}</h3>
        </div>
        <div className="max-w-full overflow-hidden sm:justify-self-end"><SensoryBadge size="sm" score={route.scoreResult.score} label={route.scoreResult.label} /></div>
      </div>

      <dl className="grid grid-cols-2 gap-2 text-sm text-inkSoft sm:grid-cols-4">
        <div className="flex items-center gap-2 rounded-xl bg-paperDim/70 p-3">
          <Clock className="w-4 h-4" aria-hidden="true" />
          <dt className="sr-only">Travel time</dt>
          <dd>{route.travelTimeMinutes} min</dd>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-paperDim/70 p-3">
          <Repeat className="w-4 h-4" aria-hidden="true" />
          <dt className="sr-only">Transfers</dt>
          <dd>
            {route.transfers} transfer{route.transfers === 1 ? '' : 's'}
          </dd>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-paperDim/70 p-3">
          <Footprints className="w-4 h-4" aria-hidden="true" />
          <dt className="sr-only">Walking distance</dt>
          <dd>{route.walkingMeters}m walking</dd>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-paperDim/70 p-3">
          <Users className="w-4 h-4" aria-hidden="true" />
          <dt className="sr-only">Crowd level</dt>
          <dd className="capitalize">
            {route.crowdLevel} crowd
          </dd>
        </div>
        {route.quietSpaceNearby && (
          <div className="col-span-2 flex items-center gap-2 rounded-xl bg-tram-light/70 p-3 text-tram-dark sm:col-span-4">
            <TreePine className="w-4 h-4" aria-hidden="true" />
            <dt className="sr-only">Nearby quiet space</dt>
            <dd>{route.quietSpaceName}</dd>
          </div>
        )}
      </dl>

      {route.scoreResult.explanation.length > 0 && (
        <div className="rounded-2xl border border-line bg-white/60 p-4">
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
