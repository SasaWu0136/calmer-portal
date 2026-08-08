'use client';

import clsx from 'clsx';
import { SensitivityLevel } from '@/lib/types';

interface PreferenceSliderProps {
  id: string;
  question: string;
  helpText?: string;
  value: SensitivityLevel;
  onChange: (value: SensitivityLevel) => void;
}

const OPTIONS: { value: SensitivityLevel; label: string }[] = [
  { value: 1, label: 'Low' },
  { value: 3, label: 'Medium' },
  { value: 5, label: 'High' }
];

export default function PreferenceSlider({ id, question, helpText, value, onChange }: PreferenceSliderProps) {
  return (
    <fieldset className="py-5 border-b border-line last:border-b-0">
      <legend className="font-medium text-ink mb-1">{question}</legend>
      {helpText && <p className="text-sm text-inkSoft mb-3">{helpText}</p>}
      <div className="flex gap-2" role="radiogroup" aria-label={question}>
        {OPTIONS.map((option) => {
          const checked = value === option.value;
          return (
            <label
              key={option.value}
              className={clsx(
                'cursor-pointer select-none rounded-full border px-4 py-2 text-sm transition-colors focus-within:ring-2 focus-within:ring-tram focus-within:ring-offset-2',
                checked ? 'bg-tram text-white border-tram font-medium' : 'bg-white text-inkSoft border-line hover:border-tram'
              )}
            >
              <input
                type="radio"
                name={id}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
