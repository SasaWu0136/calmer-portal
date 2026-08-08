import Link from 'next/link';
import { SlidersHorizontal, Route, TreePine, MessageSquareText } from 'lucide-react';

function HeroWave() {
  const width = 1200;
  const height = 220;
  const points = 180;
  let d = '';

  for (let i = 0; i <= points; i++) {
    const progress = i / points; // 0 (busy, left) -> 1 (calm, right)
    const x = progress * width;
    const amplitude = 6 + (1 - progress) * 70;
    const frequency = 2.5 + (1 - progress) * 10;
    const t = progress * Math.PI * 2 * frequency;
    const y = height / 2 + Math.sin(t) * amplitude;
    d += i === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto"
      preserveAspectRatio="none"
      role="img"
      aria-label="A wavy line that starts sharp and busy on the left and eases into a calm, flat line on the right"
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B6763A" />
          <stop offset="55%" stopColor="#5B6B93" />
          <stop offset="100%" stopColor="#3F6E5D" />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke="url(#waveGradient)" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const STEPS = [
  {
    icon: SlidersHorizontal,
    title: 'Set what affects your journey',
    body: 'Tell Calmer how crowds, noise, disruptions, walking and transfers affect you. No diagnosis needed - just preferences, in your control.'
  },
  {
    icon: Route,
    title: 'Compare routes by sensory load',
    body: 'Every option gets a plain-language score - low to very high - with the specific reasons behind it, not just a colour.'
  },
  {
    icon: TreePine,
    title: 'Find a lower-stimulation space',
    body: 'See libraries, parks and quiet corners near your route, in case you need a moment before, during or after your trip.'
  },
  {
    icon: MessageSquareText,
    title: 'Tell us how it actually felt',
    body: 'Quick feedback after your journey helps sharpen future scores - for you, and for everyone using Calmer.'
  }
];

export default function LandingPage() {
  return (
    <div>
      <section className="mx-auto max-w-content px-5 sm:px-8 pt-14 sm:pt-20 pb-6">
        <p className="text-sm font-medium tracking-wide text-tram-dark uppercase mb-4">
          Melbourne public transport, planned around you
        </p>
        <h1 className="font-display text-4xl sm:text-6xl leading-[1.05] text-ink max-w-3xl">
          Plan journeys that help you arrive calm.
        </h1>
        <p className="mt-6 text-lg text-inkSoft max-w-2xl leading-relaxed">
          Melbourne&apos;s trains, trams and buses can be genuinely overwhelming - crowded platforms, sudden
          disruptions, long walks between stops. Calmer compares your route options by sensory load, not just
          speed, so you can choose the trip that actually works for you.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            href="/preferences"
            className="focus-ring inline-flex items-center rounded-full bg-tram px-6 py-3 text-white font-medium hover:bg-tram-dark transition-colors"
          >
            Plan a calmer journey
          </Link>
          <Link
            href="/quiet-spaces"
            className="focus-ring inline-flex items-center rounded-full border border-line px-6 py-3 text-ink font-medium hover:bg-paperDim transition-colors"
          >
            Browse quiet spaces
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 sm:px-8 py-8" aria-hidden="true">
        <HeroWave />
        <div className="flex justify-between text-xs text-inkSoft mt-2 max-w-content">
          <span>A busy, unfamiliar route</span>
          <span>A route that eases off</span>
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 sm:px-8 py-16 border-t border-line">
        <h2 className="font-display text-2xl sm:text-3xl text-ink mb-2">How Calmer works</h2>
        <p className="text-inkSoft mb-10 max-w-xl">Four steps, every time you travel.</p>
        <div className="grid sm:grid-cols-2 gap-8">
          {STEPS.map((step) => (
            <div key={step.title} className="flex gap-4">
              <div className="shrink-0 w-11 h-11 rounded-full bg-tram-light flex items-center justify-center">
                <step.icon className="w-5 h-5 text-tram-dark" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-medium text-ink mb-1">{step.title}</h3>
                <p className="text-sm text-inkSoft leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 sm:px-8 py-16 border-t border-line">
        <div className="rounded-card bg-tram-light px-6 sm:px-10 py-10 sm:py-12">
          <h2 className="font-display text-2xl sm:text-3xl text-tram-dark mb-3 max-w-xl">
            Your preferences stay yours.
          </h2>
          <p className="text-tram-dark/80 max-w-xl leading-relaxed mb-6">
            Calmer never asks what disability or diagnosis you have - only what affects your journey. Preferences
            are stored on your device, and you can travel anonymously at any time.
          </p>
          <Link
            href="/journey"
            className="focus-ring inline-flex items-center rounded-full bg-tram-dark px-6 py-3 text-white font-medium hover:bg-ink transition-colors"
          >
            Search a journey now
          </Link>
        </div>
      </section>
    </div>
  );
}
