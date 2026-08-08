'use client';

import { useEffect, useState } from 'react';
import { Database, MessageSquareText, MapPinned, AlertTriangle } from 'lucide-react';
import { QuietSpace, Disruption, FeedbackEntry } from '@/lib/types';

type SpaceType = QuietSpace['type'];
const SPACE_TYPES: SpaceType[] = ['Library', 'Park', 'Community Centre', 'Station rest area', 'Gallery'];

const EMPTY_FORM = {
  name: '',
  type: 'Library' as SpaceType,
  address: '',
  lat: '',
  lng: '',
  openingHours: '',
  accessibilityNotes: '',
  sensoryNotes: ''
};

export default function AdminPage() {
  const [quietSpaces, setQuietSpaces] = useState<QuietSpace[]>([]);
  const [curatedCount, setCuratedCount] = useState(0);
  const [adminAddedCount, setAdminAddedCount] = useState(0);
  const [supabaseConfigured, setSupabaseConfigured] = useState(false);
  const [disruptions, setDisruptions] = useState<Disruption[]>([]);
  const [feedback, setFeedback] = useState<FeedbackEntry[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formStatus, setFormStatus] = useState<'idle' | 'saving' | 'error'>('idle');

  function loadQuietSpaces() {
    fetch('/api/quiet-spaces')
      .then((res) => res.json())
      .then((data) => {
        setQuietSpaces(data.quietSpaces ?? []);
        setCuratedCount(data.curatedCount ?? 0);
        setAdminAddedCount(data.adminAddedCount ?? 0);
        setSupabaseConfigured(Boolean(data.supabaseConfigured));
      });
  }

  useEffect(() => {
    loadQuietSpaces();
    fetch('/api/disruptions')
      .then((res) => res.json())
      .then((data) => setDisruptions(data.disruptions ?? []));
    fetch('/api/feedback')
      .then((res) => res.json())
      .then((data) => setFeedback(data.feedback ?? []));
  }, []);

  async function handleAddSpace(e: React.FormEvent) {
    e.preventDefault();
    setFormStatus('saving');
    try {
      const res = await fetch('/api/quiet-spaces', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          lat: parseFloat(form.lat),
          lng: parseFloat(form.lng)
        })
      });
      if (!res.ok) throw new Error('Failed');
      setForm(EMPTY_FORM);
      setFormStatus('idle');
      loadQuietSpaces();
    } catch {
      setFormStatus('error');
    }
  }

  return (
    <div className="mx-auto max-w-content px-5 sm:px-8 py-14">
      <h1 className="font-display text-3xl sm:text-4xl text-ink mb-3">Admin dashboard</h1>
      <p className="text-inkSoft max-w-xl mb-10">
        Manage quiet spaces, review feedback, and check what&apos;s live vs. mocked. No login is required for this
        MVP - add real auth before using this in production.
      </p>

      <section className="mb-12">
        <h2 className="flex items-center gap-2 font-medium text-ink text-lg mb-4">
          <Database className="w-5 h-5 text-tram-dark" aria-hidden="true" />
          Data status
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white border border-line rounded-card p-5">
            <p className="text-2xl font-display text-ink">{curatedCount + adminAddedCount}</p>
            <p className="text-sm text-inkSoft mt-1">
              Quiet spaces ({curatedCount} curated, {adminAddedCount} added here)
            </p>
          </div>
          <div className="bg-white border border-line rounded-card p-5">
            <p className="text-2xl font-display text-ink">{disruptions.length}</p>
            <p className="text-sm text-inkSoft mt-1">Active mock disruptions</p>
          </div>
          <div className="bg-white border border-line rounded-card p-5">
            <p className="text-2xl font-display text-ink">{supabaseConfigured ? 'Connected' : 'Not connected'}</p>
            <p className="text-sm text-inkSoft mt-1">
              Supabase persistence {supabaseConfigured ? '' : '- quiet spaces added below reset on redeploy'}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="flex items-center gap-2 font-medium text-ink text-lg mb-4">
          <AlertTriangle className="w-5 h-5 text-caution-dark" aria-hidden="true" />
          Current high-risk areas
        </h2>
        <div className="bg-white border border-line rounded-card divide-y divide-line">
          {disruptions.map((d) => (
            <div key={d.id} className="p-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-medium text-ink text-sm">{d.title}</p>
                <p className="text-sm text-inkSoft">{d.description}</p>
              </div>
              <span className="text-xs text-inkSoft whitespace-nowrap">
                {d.disruptionType} - severity {d.severity}/3
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="flex items-center gap-2 font-medium text-ink text-lg mb-4">
          <MapPinned className="w-5 h-5 text-tram-dark" aria-hidden="true" />
          Add a quiet space
        </h2>
        <form onSubmit={handleAddSpace} className="bg-white border border-line rounded-card p-6 max-w-2xl grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-ink mb-1">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="focus-ring w-full rounded-lg border border-line px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as SpaceType })}
              className="focus-ring w-full rounded-lg border border-line px-3 py-2 bg-white"
            >
              {SPACE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Opening hours</label>
            <input
              required
              value={form.openingHours}
              onChange={(e) => setForm({ ...form, openingHours: e.target.value })}
              className="focus-ring w-full rounded-lg border border-line px-3 py-2"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-ink mb-1">Address</label>
            <input
              required
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="focus-ring w-full rounded-lg border border-line px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Latitude</label>
            <input
              required
              type="number"
              step="any"
              value={form.lat}
              onChange={(e) => setForm({ ...form, lat: e.target.value })}
              className="focus-ring w-full rounded-lg border border-line px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Longitude</label>
            <input
              required
              type="number"
              step="any"
              value={form.lng}
              onChange={(e) => setForm({ ...form, lng: e.target.value })}
              className="focus-ring w-full rounded-lg border border-line px-3 py-2"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-ink mb-1">Sensory notes</label>
            <textarea
              value={form.sensoryNotes}
              onChange={(e) => setForm({ ...form, sensoryNotes: e.target.value })}
              rows={2}
              className="focus-ring w-full rounded-lg border border-line px-3 py-2"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-ink mb-1">Accessibility notes</label>
            <textarea
              value={form.accessibilityNotes}
              onChange={(e) => setForm({ ...form, accessibilityNotes: e.target.value })}
              rows={2}
              className="focus-ring w-full rounded-lg border border-line px-3 py-2"
            />
          </div>
          <div className="sm:col-span-2 flex items-center gap-4">
            <button
              type="submit"
              disabled={formStatus === 'saving'}
              className="focus-ring rounded-full bg-tram px-6 py-2.5 text-white font-medium hover:bg-tram-dark transition-colors disabled:opacity-60"
            >
              {formStatus === 'saving' ? 'Saving...' : 'Add quiet space'}
            </button>
            {formStatus === 'error' && <span className="text-sm text-caution-dark">Couldn&apos;t save that - try again.</span>}
          </div>
        </form>
      </section>

      <section>
        <h2 className="flex items-center gap-2 font-medium text-ink text-lg mb-4">
          <MessageSquareText className="w-5 h-5 text-tram-dark" aria-hidden="true" />
          Recent feedback
        </h2>
        {feedback.length === 0 ? (
          <p className="text-inkSoft">No feedback submitted yet.</p>
        ) : (
          <div className="bg-white border border-line rounded-card divide-y divide-line">
            {feedback.map((f) => (
              <div key={f.id} className="p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium text-ink text-sm">{f.routeName}</p>
                  <span className="text-xs text-inkSoft">
                    Rating {f.rating}/5 - {f.feltOverwhelmed ? 'felt overwhelmed' : 'felt okay'}
                  </span>
                </div>
                {f.cause && <p className="text-sm text-inkSoft mt-1">Cause: {f.cause}</p>}
                {f.comment && <p className="text-sm text-inkSoft mt-1">&ldquo;{f.comment}&rdquo;</p>}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
