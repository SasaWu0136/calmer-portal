'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PreferenceSlider from '@/components/PreferenceSlider';
import { DEFAULT_PREFERENCES, SensitivityLevel, SensoryPreferences } from '@/lib/types';
import { getStoredPreferences, setStoredPreferences } from '@/lib/preferences';

const FIELDS: {
  key: keyof SensoryPreferences;
  question: string;
  helpText: string;
}[] = [
  {
    key: 'crowd',
    question: 'What affects your journey: crowds?',
    helpText: 'Busy platforms, packed carriages, queues.'
  },
  {
    key: 'noise',
    question: 'What affects your journey: noise?',
    helpText: 'Announcements, traffic, busy CBD or event zones.'
  },
  {
    key: 'disruptions',
    question: 'What affects your journey: sudden disruptions?',
    helpText: 'Unexpected delays, cancellations, roadworks.'
  },
  {
    key: 'walking',
    question: 'What affects your journey: long walking distances?',
    helpText: 'Walking between platforms, stops, or to your destination.'
  },
  {
    key: 'transfers',
    question: 'What affects your journey: too many transfers?',
    helpText: 'Changing trains, trams or buses partway through a trip.'
  },
  {
    key: 'visualLoad',
    question: 'What affects your journey: busy or flashing visual environments?',
    helpText: 'Screens, signage, crowds of moving people.'
  }
];

export default function PreferencesPage() {
  const router = useRouter();
  const [prefs, setPrefs] = useState<SensoryPreferences>(DEFAULT_PREFERENCES);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setPrefs(getStoredPreferences());
  }, []);

  function update(key: keyof SensoryPreferences, value: SensitivityLevel) {
    setPrefs((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setStoredPreferences(prefs);
    setSaved(true);
  }

  return (
    <div className="mx-auto max-w-content px-5 sm:px-8 py-14">
      <p className="text-sm font-medium tracking-wide text-tram-dark uppercase mb-3">Step 1 of 2</p>
      <h1 className="font-display text-3xl sm:text-4xl text-ink mb-3">What affects your journey?</h1>
      <p className="text-inkSoft max-w-xl mb-10 leading-relaxed">
        These preferences shape every sensory score you see - not a diagnosis, just what matters to you today. You
        can change them any time, and they stay on this device.
      </p>

      <form onSubmit={handleSave} className="max-w-2xl bg-white border border-line rounded-card px-6 sm:px-8">
        {FIELDS.map((field) => (
          <PreferenceSlider
            key={field.key}
            id={field.key}
            question={field.question}
            helpText={field.helpText}
            value={prefs[field.key]}
            onChange={(value) => update(field.key, value)}
          />
        ))}

        <div className="py-6 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="focus-ring rounded-full bg-tram px-6 py-3 text-white font-medium hover:bg-tram-dark transition-colors"
          >
            Save preferences
          </button>
          <button
            type="button"
            onClick={() => {
              setStoredPreferences(prefs);
              router.push('/journey');
            }}
            className="focus-ring rounded-full border border-line px-6 py-3 text-ink font-medium hover:bg-paperDim transition-colors"
          >
            Save and plan a journey
          </button>
          {saved && (
            <span role="status" className="text-sm text-tram-dark font-medium">
              Saved on this device.
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
