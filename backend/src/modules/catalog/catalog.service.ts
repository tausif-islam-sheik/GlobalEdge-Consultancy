import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

@Injectable()
export class CatalogService {
  constructor(private prisma: PrismaService) {}
  private async safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
    try { return await fn(); } catch { return fallback; }
  }

  async countries(q?: string) {
    const rows = await this.safe(
      () => this.prisma.country.findMany({
        where: q ? { name: { contains: q, mode: 'insensitive' } } : undefined,
        orderBy: { name: 'asc' },
      }),
      [],
    );
    if (!rows.length && !q) {
      return [
        { id: 'demo-uk', name: 'United Kingdom', slug: 'uk', isoCode: 'GB' },
        { id: 'demo-usa', name: 'United States', slug: 'usa', isoCode: 'US' },
        { id: 'demo-canada', name: 'Canada', slug: 'canada', isoCode: 'CA' },
        { id: 'demo-malaysia', name: 'Malaysia', slug: 'malaysia', isoCode: 'MY' },
      ];
    }
    return rows.map((c) => ({ ...c, slug: slugify(c.name) }));
  }

  async institutions(q?: string) {
    const rows = await this.safe(
      () => this.prisma.university.findMany({
        where: q
          ? { OR: [{ name: { contains: q, mode: 'insensitive' } }, { location: { contains: q, mode: 'insensitive' } }] }
          : { status: 'ACTIVE' },
        include: { country: true, _count: { select: { programs: true } } },
        orderBy: { name: 'asc' },
      }),
      [],
    );
    if (!rows.length && !q) {
      return [
        { id: 'demo-apu', name: 'Asia Pacific University (APU)', slug: 'apu', shortName: 'APU' },
        { id: 'demo-inti', name: 'INTI International University', slug: 'inti', shortName: 'INTI' },
        { id: 'demo-segi', name: 'SEGi University', slug: 'segi', shortName: 'SEGi' },
      ];
    }
    return rows.map((u) => ({
      id: u.id,
      name: u.name,
      slug: slugify(u.name),
      shortName: u.name,
      country: u.country?.name ?? null,
      location: u.location,
      website: u.website,
      logo: u.logoUrl,
      programs: u._count.programs,
      status: u.status,
    }));
  }

  async institution(key: string) {
    const byId = await this.safe(
      () => this.prisma.university.findUnique({
        where: { id: key },
        include: { country: true, campuses: true, programs: { take: 20 }, _count: { select: { programs: true } } },
      }),
      null,
    );
    const row = byId ?? (await this.safe(
      () => this.prisma.university.findFirst({
        where: { name: { contains: key.replace(/-/g, ' '), mode: 'insensitive' } },
        include: { country: true, campuses: true, programs: { take: 20 }, _count: { select: { programs: true } } },
      }),
      null,
    ));
    if (!row) return null;
    return {
      id: row.id,
      name: row.name,
      slug: slugify(row.name),
      country: row.country?.name ?? null,
      location: row.location,
      website: row.website,
      phone: row.phone,
      email: null,
      description: row.description,
      logo: row.logoUrl,
      cover: row.bannerUrl,
      status: row.status,
      totalPrograms: row._count.programs,
      campuses: row.campuses,
      programs: row.programs.map((p) => ({ id: p.id, name: p.name, slug: p.id, level: p.level, duration: p.duration })),
    };
  }

  async programs(q?: string) {
    const rows = await this.safe(
      () => this.prisma.program.findMany({
        where: q ? { name: { contains: q, mode: 'insensitive' } } : { isVisible: true },
        include: { university: { include: { country: true } }, faculty: true, degreeLevel: true },
        orderBy: { createdAt: 'desc' },
        take: 100,
      }),
      [],
    );
    if (!rows.length && !q) {
      return [
        { id: 'demo-cs', title: 'Bachelor in Computer Science (Hons)', slug: 'bachelor-computer-science-msu', level: "Bachelor's", duration: '3 Years' },
        { id: 'demo-bba', title: 'Bachelor of Business Administration', slug: 'bba-inti', level: "Bachelor's", duration: '3 Years' },
      ];
    }
    return rows.map((p) => ({
      id: p.id,
      title: p.name,
      slug: p.id,
      name: p.name,
      level: p.degreeLevel?.name ?? p.level,
      field: p.faculty?.name ?? null,
      duration: p.duration,
      processing: p.processingTime,
      tuition: p.tuitionFee.toString(),
      currency: p.currency,
      university: p.university?.name ?? null,
      country: p.university?.country?.name ?? null,
    }));
  }

  async program(id: string) {
    const p = await this.safe(
      () => this.prisma.program.findUnique({
        where: { id },
        include: {
          university: { include: { country: true, campuses: true } },
          faculty: true,
          degreeLevel: true,
          programIntakes: { include: { intake: true } },
        },
      }),
      null,
    );
    if (!p) return null;
    return {
      id: p.id,
      title: p.name,
      slug: p.id,
      level: p.degreeLevel?.name ?? p.level,
      field: p.faculty?.name ?? null,
      duration: p.duration,
      processing: p.processingTime,
      tuition: p.tuitionFee.toString(),
      applicationFee: p.applicationFee.toString(),
      deposit: p.deposit.toString(),
      currency: p.currency,
      description: p.description,
      requirements: p.requirements,
      requiredDocuments: p.requiredDocuments,
      englishRequirements: p.englishRequirements,
      university: p.university ? {
        id: p.university.id,
        name: p.university.name,
        country: p.university.country?.name ?? null,
        location: p.university.location,
        website: p.university.website,
        campuses: p.university.campuses,
      } : null,
      intakes: p.programIntakes.map((pi) => pi.intake),
    };
  }

  async posts(type: string) {
    const rows = await this.safe(
      () => this.prisma.announcement.findMany({ orderBy: { createdAt: 'desc' }, take: 20 }),
      [],
    );
    return rows.map((a) => ({
      id: a.id,
      title: a.title,
      date: a.createdAt,
      tag: a.target === 'ALL' ? type : a.target,
    }));
  }
}
