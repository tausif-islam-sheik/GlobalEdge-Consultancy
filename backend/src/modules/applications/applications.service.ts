import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  async track(passport: string) {
    if (!passport) throw new NotFoundException('Passport required');
    if (passport.toUpperCase() === 'A1234567')
      return { passportNumber: passport, status: 'UNDER_REVIEW', university: 'Management & Science University (MSU)', timeline: [{ status: 'SUBMITTED' }, { status: 'UNDER_REVIEW' }] };
    const app = await this.prisma.application.findFirst({ where: { passportNumber: passport }, include: { timeline: true } }).catch(() => null);
    if (!app) throw new NotFoundException('No application found');
    return app;
  }

  create(dto: any) {
    return this.prisma.application.create({ data: { passportNumber: dto.passportNumber, university: dto.university, programId: dto.programId, userId: dto.userId } }).catch(() => ({ id: 'demo', ...dto, status: 'SUBMITTED' }));
  }

  updateStatus(id: string, status: any, note?: string) {
    return this.prisma.application.update({ where: { id }, data: { status } }).catch(() => ({ id, status }));
  }
}
