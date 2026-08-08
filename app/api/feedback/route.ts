import { NextResponse } from 'next/server';
import { z } from 'zod';
import { addFeedbackEntry, getFeedbackEntries } from '@/lib/adminStore';

const feedbackSchema = z.object({
  routeName: z.string().min(1),
  origin: z.string().default(''),
  destination: z.string().default(''),
  rating: z.number().min(1).max(5),
  feltOverwhelmed: z.boolean(),
  cause: z.string().optional(),
  comment: z.string().optional(),
  wouldChooseAgain: z.boolean()
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = feedbackSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid feedback', details: parsed.error.flatten() }, { status: 400 });
  }

  const entry = {
    id: `fb-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...parsed.data
  };
  addFeedbackEntry(entry);

  return NextResponse.json({ entry }, { status: 201 });
}

export async function GET() {
  return NextResponse.json({ feedback: getFeedbackEntries() });
}
