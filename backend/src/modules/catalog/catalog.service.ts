import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

const demoCountries = [
  { name: 'United Kingdom', slug: 'uk' }, { name: 'United States', slug: 'usa' },
  { name: 'Canada', slug: 'canada' }, { name: 'Malaysia', slug: 'malaysia' },
];
const demoInstitutions = [
  { name: 'Asia Pacific University (APU)', slug: 'apu', shortName: 'APU' },
  { name: 'INTI International University', slug: 'inti', shortName: 'INTI' },
  { name: 'SEGi University', slug: 'segi', shortName: 'SEGi' },
];
const demoPrograms = [
  { title: 'Bachelor in Computer Science (Hons)', slug: 'bachelor-computer-science-msu', level: "Bachelor's", duration: '3 Years' },
  { title: 'Bachelor of Business Administration', slug: 'bba-inti', level: "Bachelor's", duration: '3 Years' },
];

@Injectable()
export class CatalogService {
  constructor(private prisma: PrismaService) {}
  private async safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
    try { return await fn(); } catch { return fallback; }
  }
  countries(q?: string) {
    const where = q ? { name: { contains: q, mode: 'insensitive' as const } } : undefined;
    return this.safe(() => this.prisma.country.findMany({ where }), demoCountries as any);
  }
  institutions(q?: string) {
    const where = q
      ? { OR: [{ name: { contains: q, mode: 'insensitive' as const } }, { shortName: { contains: q, mode: 'insensitive' as const } }] }
      : undefined;
    return this.safe(() => this.prisma.institution.findMany({ where, include: { country: true } }), demoInstitutions as any);
  }
  programs(q?: string) {
    const where = q ? { title: { contains: q, mode: 'insensitive' as const } } : undefined;
    return this.safe(() => this.prisma.program.findMany({ where, include: { institution: true } }), demoPrograms as any);
  }
  posts(type: string) {
    return this.safe(() => this.prisma.post.findMany({ where: { type: type.toUpperCase() as any } }), []);
  }
}
