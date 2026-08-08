'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getChosenRoute } from '@/lib/preferences';
import { ScoredRoute } from '@/lib/types';

const CAUSES = ['Crowds', 'Noise', 'Disruption', 'Long walk', 'Too many transfers', 'Something else'];

export default function FeedbackPage() {
  const [route, setRoute] = useState<ScoredRoute | null>(null);
  const [rating, setRating] = useState(3);
  const [feltOverwhelmed, setFeltOverwhelmed] = useState<boolean | null>(null);
  const [cause, setCause] = useState('');
  const [wouldChooseAgain, setWouldChooseAgain] = useState<boolean | null>(null);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');

  useEffect(() => {
    setRoute(getChosenRoute());
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          routeName: route?.name ?? 'Unspecified route',
          origin: route?.origin ?? '',
          destination: route?.destination ?? '',
          rating,
          feltOverwhelmed: feltOverwhelmed ?? false,
          cause: feltOverwhelmed ? cause : undefined,
          comment,
          wouldChooseAgain: wouldChooseAgain ?? true
        })
      });
      if (!res.ok) throw new Error('Failed to submit');
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="mx-auto max-w-content px-5 sm:px-8 py-14">
        <h1 className="font-display text-3xl text-ink mb-3">Thanks for sharing that.</h1>
        <p className="text-inkSoft max-w-lg mb-6">
          Your feedback helps make future sensory scores more accurate - for you and for everyone using Calmer.
        </p>
        <Link
          href="/journey"
          className="focus-ring inline-flex items-center rounded-full bg-tram px-6 py-3 text-white font-medium hover:bg-tram-dark transition-colors"
        >
          Plan another journey
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-content px-5 sm:px-8 py-14">
      <h1 className="font-display text-3xl sm:text-4xl text-ink mb-3">How did that journey feel?</h1>
      <p className="text-inkSoft max-w-xl mb-8">
        {route ? (
          <>
            About <strong className="text-ink font-medium">{route.name}</strong> from {route.origin} to{' '}
            {route.destination}.
          </>
        ) : (
          "No specific journey on record - your answers will still help, they just won't be tied to a route."
        )}
      </p>

      <form onSubmit={handleSubmit} className="max-w-xl bg-white border border-line rounded-card px-6 sm:px-8 py-6 space-y-7">
        <div>
          <label htmlFor="rating" className="block font-medium text-ink mb-1.5">
            Overall, how manageable was this journey?
          </label>
          <p className="text-sm text-inkSoft mb-3">1 = very overwhelming, 5 = very manageable</p>
          <input
            id="rating"
            type="range"
            min={1}
            max={5}
            step={1}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full accent-tram"
          />
          <div className="flex justify-between text-xs text-inkSoft mt-1">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>

        <fieldset>
          <legend className="font-medium text-ink mb-2">Were you overwhelmed at any point?</legend>
          <div className="flex gap-2">
            {[true, false].map((val) => (
              <label
                key={String(val)}
                className={`cursor-pointer rounded-full border px-4 py-2 text-sm ${
                  feltOverwhelmed === val ? 'bg-tram text-white border-tram font-medium' : 'bg-white text-inkSoft border-line'
                }`}
              >
                <input type="radio" name="overwhelmed" className="sr-only" checked={feltOverwhelmed === val} onChange={() => setFeltOverwhelmed(val)} />
                {val ? 'Yes' : 'No'}
              </label>
            ))}
          </div>
        </fieldset>

        {feltOverwhelmed && (
          <div>
            <label htmlFor="cause" className="block font-medium text-ink mb-1.5">
              What caused the issue?
            </label>
            <select
              id="cause"
              value={cause}
              onChange={(e) => setCause(e.target.value)}
              className="focus-ring w-full rounded-lg border border-line px-3.5 py-2.5 text-ink bg-white"
            >
              <option value="">Select a reason</option>
              {CAUSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        )}

        <fieldset>
          <legend className="font-medium text-ink mb-2">Would you choose this route again?</legend>
          <div className="flex gap-2">
            {[true, false].map((val) => (
              <label
                key={String(val)}
                className={`cursor-pointer rounded-full border px-4 py-2 text-sm ${
                  wouldChooseAgain === val ? 'bg-tram text-white border-tram font-medium' : 'bg-white text-inkSoft border-line'
                }`}
              >
                <input
                  type="radio"
                  name="chooseAgain"
                  className="sr-only"
                  checked={wouldChooseAgain === val}
                  onChange={() => setWouldChooseAgain(val)}
                />
                {val ? 'Yes' : 'No'}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="comment" className="block font-medium text-ink mb-1.5">
            Anything else worth noting? (optional)
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            className="focus-ring w-full rounded-lg border border-line px-3.5 py-2.5 text-ink"
          />
        </div>

        {status === 'error' && <p className="text-sm text-caution-dark">Something went wrong sending that - please try again.</p>}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="focus-ring rounded-full bg-tram px-6 py-3 text-white font-medium hover:bg-tram-dark transition-colors disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending...' : 'Send feedback'}
        </button>
      </form>
    </div>
  );
}
