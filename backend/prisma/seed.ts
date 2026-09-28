import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

async function main() {
  const prisma = new PrismaClient();
  try {
    const hash = await bcrypt.hash('admin123', 10);
    await prisma.user.upsert({
      where: { email: 'admin@globaledge.com' },
      update: {},
      create: { name: 'Admin', email: 'admin@globaledge.com', password: hash, role: 'ADMIN' },
    });
    for (const c of [{ name: 'Malaysia', slug: 'malaysia' }, { name: 'United Kingdom', slug: 'uk' }, { name: 'USA', slug: 'usa' }, { name: 'Canada', slug: 'canada' }])
      await prisma.country.upsert({ where: { slug: c.slug }, update: {}, create: c });
    await prisma.application.upsert({
      where: { id: 'demo-app-1' },
      update: {},
      create: { id: 'demo-app-1', passportNumber: 'A1234567', status: 'UNDER_REVIEW', university: 'Management & Science University (MSU)' },
    });
    console.log('Seeded admin@globaledge.com / admin123 + demo A1234567');
  } catch (e) { console.log('Seed skipped (DB offline):', (e as Error).message); }
}
main();
