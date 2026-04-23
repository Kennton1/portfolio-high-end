import React from 'react';
import { prisma } from '@/lib/prisma';
import DashboardContent from './DashboardContent';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const messages = await prisma.message.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Intentamos obtener las visitas. Si la tabla no existe aún, evitamos que la página explote.
  let views = 0;
  try {
    const analytics = await prisma.analytics.findUnique({
      where: { id: "global" }
    });
    views = analytics?.views || 0;
  } catch (error) {
    // Si la tabla no existe porque falta hacer prisma db push, devolvemos 0 temporalmente
  }

  return <DashboardContent messages={messages} views={views} />;
}
