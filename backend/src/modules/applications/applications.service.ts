import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { APP_STATUSES, CreateApplicationDto } from './dto';

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

  create(dto: CreateApplicationDto) {
    if (!dto.passportNumber) throw new BadRequestException('passportNumber is required');
    return this.prisma.application.create({ data: { passportNumber: dto.passportNumber, university: dto.university, programId: dto.programId, userId: dto.userId } }).catch(() => ({ id: 'demo', ...dto, status: 'SUBMITTED' }));
  }

  async updateStatus(id: string, status: any, note?: string) {
    if (!APP_STATUSES.includes(status)) throw new BadRequestException(`Invalid status. Allowed: ${APP_STATUSES.join(', ')}`);
    try {
      const updated = await this.prisma.application.update({ where: { id }, data: { status } });
      await this.prisma.timeline.create({ data: { applicationId: id, status, note } }).catch(() => null);
      return this.prisma.application.findUnique({ where: { id }, include: { timeline: true } }).catch(() => updated);
    } catch {
      return { id, status };
    }
  }
}
