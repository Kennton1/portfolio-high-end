import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    const analytics = await prisma.analytics.upsert({
      where: { id: 'global' },
      update: { views: { increment: 1 } },
      create: { id: 'global', views: 1 }
    });
    return NextResponse.json(analytics);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to track view' }, { status: 500 });
  }
}
