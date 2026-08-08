import { NextResponse } from 'next/server';
import { getMockDisruptions } from '@/lib/disruptionsData';

export async function GET() {
  return NextResponse.json({ disruptions: getMockDisruptions() });
}
