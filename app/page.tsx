import Link from 'next/link';
import { SlidersHorizontal, Route, TreePine, MessageSquareText, Clock3, Footprints, Users, ArrowRight } from 'lucide-react';

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
      <section className="mx-auto grid max-w-content gap-12 px-5 pb-16 pt-14 sm:px-8 sm:pt-20 2xl:grid-cols-[minmax(0,1.02fr)_minmax(0,.98fr)] 2xl:items-center 2xl:gap-16">
        <div>
          <p className="eyebrow mb-5">Melbourne public transport, planned around you</p>
          <h1 className="font-display text-5xl leading-[.98] tracking-[-0.035em] text-ink sm:text-7xl">
            Arrive with more <span className="italic text-tram">calm</span> left in you.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-inkSoft">
            Compare Melbourne routes by crowds, walking, transfers and disruptions—not travel time alone. Calmer helps you choose the journey that feels manageable today.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/preferences" className="focus-ring inline-flex items-center gap-2 rounded-full bg-tram px-6 py-3.5 font-medium text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-tram-dark">
              Plan a calmer journey <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/quiet-spaces" className="focus-ring inline-flex items-center rounded-full border border-line bg-white/70 px-6 py-3.5 font-medium text-ink transition-colors hover:bg-white">
              Browse quiet spaces
            </Link>
          </div>
          <p className="mt-5 text-xs text-inkSoft">No diagnosis needed · Preferences stay on your device</p>
        </div>

        <div className="relative mx-auto w-full max-w-xl" aria-label="Example of a calmer route comparison">
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-tram-light via-white/30 to-dusk-light blur-2xl" />
          <div className="surface-card overflow-hidden rounded-[1.75rem] p-5 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-5">
              <div><p className="text-xs font-semibold uppercase tracking-[.14em] text-inkSoft">Recommended route</p><h2 className="mt-2 text-xl font-semibold">Train via Richmond</h2></div>
              <span className="rounded-full bg-tram-light px-3 py-1.5 text-xs font-semibold text-tram-dark">Low sensory load</span>
            </div>
            <div className="my-6 flex items-center gap-3" aria-hidden="true">
              <span className="h-4 w-4 rounded-full border-[4px] border-tram bg-white" />
              <span className="h-1 flex-1 rounded-full bg-gradient-to-r from-tram via-tram/60 to-dusk/50" />
              <span className="h-4 w-4 rounded-full border-[4px] border-dusk bg-white" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[{icon: Clock3,label:'42 min',sub:'travel time'}, {icon: Users,label:'Low',sub:'crowd level'}, {icon: Footprints,label:'240 m',sub:'walking'}].map((item) => (
                <div key={item.sub} className="rounded-2xl bg-paperDim/70 p-3.5"><item.icon className="mb-3 h-4 w-4 text-tram"/><p className="font-semibold text-ink">{item.label}</p><p className="mt-0.5 text-[11px] text-inkSoft">{item.sub}</p></div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-tram/15 bg-tram-light/60 p-4"><p className="text-xs font-semibold text-tram-dark">Why this route feels calmer</p><p className="mt-1.5 text-sm leading-relaxed text-inkSoft">Fewer transfers, a quieter interchange and a short walk at the destination.</p></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 sm:px-8 pb-10" aria-hidden="true"><div className="rounded-full bg-white/55 px-5 py-2 shadow-soft"><HeroWave /></div></section>

      <section className="mx-auto max-w-content px-5 sm:px-8 py-16 border-t border-line">
        <h2 className="font-display text-2xl sm:text-3xl text-ink mb-2">How Calmer works</h2>
        <p className="text-inkSoft mb-10 max-w-xl">Four steps, every time you travel.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.title} className="surface-card rounded-[1.35rem] p-5">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-tram-light">
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
