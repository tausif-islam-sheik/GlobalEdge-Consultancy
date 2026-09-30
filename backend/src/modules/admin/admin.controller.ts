import { Controller, Get, Query } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Controller('admin')
export class AdminController {
  constructor(private prisma: PrismaService) {}
  @Get('overview')
  async overview() {
    try {
      const [users, applications, institutions, programs] = await Promise.all([
        this.prisma.user.count(), this.prisma.application.count(),
        this.prisma.university.count(), this.prisma.program.count(),
      ]);
      return { users, applications, institutions, programs };
    } catch {
      return { users: 1557, applications: 320, institutions: 59, programs: 1609, demo: true };
    }
  }

  @Get('students')
  async students(@Query('search') q?: string) {
    try {
      const rows = await this.prisma.student.findMany({
        where: q
          ? { OR: [{ firstName: { contains: q, mode: 'insensitive' } }, { lastName: { contains: q, mode: 'insensitive' } }, { email: { contains: q, mode: 'insensitive' } }] }
          : undefined,
        include: { user: { select: { email: true, status: true } }, agent: { select: { agencyName: true } } },
        orderBy: { createdAt: 'desc' },
        take: 100,
      });
      return rows.map((s) => ({
        id: s.id, name: `${s.firstName} ${s.lastName}`, email: s.email ?? s.user.email,
        phone: s.phone, country: s.country, passport: s.passportNumber,
        agent: s.agent?.agencyName ?? 'Direct Student', status: s.user.status, createdAt: s.createdAt,
      }));
    } catch { return []; }
  }

  @Get('agents')
  async agents() {
    try {
      const rows = await this.prisma.agent.findMany({
        include: { user: { select: { email: true, status: true } } },
        orderBy: { createdAt: 'desc' },
        take: 100,
      });
      return rows.map((a) => ({
        id: a.id, agency: a.agencyName, owner: a.ownerName, email: a.user.email,
        location: a.location, status: a.status, verified: a.verified, createdAt: a.createdAt,
      }));
    } catch { return []; }
  }

  @Get('applications')
  async applications() {
    try {
      const rows = await this.prisma.application.findMany({
        include: {
          student: { select: { firstName: true, lastName: true } },
          university: { select: { name: true } },
          program: { select: { name: true } },
          stage: { select: { name: true } },
        },
        orderBy: { appliedAt: 'desc' },
        take: 100,
      });
      return rows.map((a) => ({
        id: a.id, student: `${a.student.firstName} ${a.student.lastName}`,
        university: a.university.name, program: a.program.name,
        stage: a.stage.name, status: a.status, appliedAt: a.appliedAt,
      }));
    } catch { return []; }
  }
}
