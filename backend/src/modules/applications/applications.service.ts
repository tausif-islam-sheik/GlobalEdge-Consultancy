import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { APP_STATUSES, CreateApplicationDto } from './dto';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  private async actorId() {
    const admin = await this.prisma.user.findFirst({
      where: { role: { name: 'ADMIN' } }, select: { id: true },
    }).catch(() => null);
    return admin?.id ?? null;
  }

  async track(passport: string) {
    if (!passport) throw new NotFoundException('Passport required');
    const student = await this.prisma.student.findFirst({
      where: { passportNumber: passport },
      include: {
        applications: {
          include: { university: { select: { name: true } }, program: { select: { name: true } }, stage: { select: { name: true } } },
          orderBy: { appliedAt: 'desc' },
          take: 1,
        },
      },
    }).catch(() => null);
    const app = student?.applications[0];
    if (!app) throw new NotFoundException('No application found');
    const history = await this.prisma.statusHistory.findMany({
      where: { entityType: 'APPLICATION', entityId: app.id },
      orderBy: { createdAt: 'asc' },
    }).catch(() => []);
    return {
      passportNumber: passport,
      status: app.status,
      university: app.university.name,
      program: app.program.name,
      stage: app.stage.name,
      timeline: [{ status: 'SUBMITTED' }, ...history.map((h) => ({ status: h.newStatus, note: h.reason }))],
    };
  }

  async create(dto: CreateApplicationDto) {
    if (!dto.studentId || !dto.universityId || !dto.programId || !dto.intakeId) {
      // legacy path: resolve a student from passport number if possible
      if (dto.passportNumber) {
        const student = await this.prisma.student.findFirst({ where: { passportNumber: dto.passportNumber } }).catch(() => null);
        if (!student) throw new BadRequestException('studentId, universityId, programId and intakeId are required');
        dto.studentId = student.id;
      } else {
        throw new BadRequestException('studentId, universityId, programId and intakeId are required');
      }
      if (!dto.universityId || !dto.programId || !dto.intakeId)
        throw new BadRequestException('studentId, universityId, programId and intakeId are required');
    }
    let stageId = dto.stageId;
    if (!stageId) {
      const first = await this.prisma.applicationStage.findFirst({ orderBy: { order: 'asc' } }).catch(() => null);
      stageId = first?.id;
      if (!stageId) throw new BadRequestException('No application stages configured');
    }
    try {
      const app = await this.prisma.application.create({
        data: {
          studentId: dto.studentId!, universityId: dto.universityId!,
          programId: dto.programId!, intakeId: dto.intakeId!,
          campusId: dto.campusId ?? null, stageId: stageId!,
          agentId: dto.agentId ?? null, status: 'SUBMITTED',
        },
        include: { university: { select: { name: true } }, program: { select: { name: true } }, stage: { select: { name: true } } },
      });
      const actor = (await this.actorId()) ?? (await this.prisma.student.findUnique({ where: { id: app.studentId }, select: { userId: true } }).catch(() => null))?.userId;
      if (actor) {
        await this.prisma.statusHistory.create({
          data: { entityType: 'APPLICATION', entityId: app.id, newStatus: 'SUBMITTED', changedById: actor },
        }).catch(() => null);
      }
      return app;
    } catch (e) {
      if (e instanceof BadRequestException) throw e;
      throw new BadRequestException('Could not create application');
    }
  }

  async updateStatus(id: string, status: any, note?: string) {
    if (!APP_STATUSES.includes(status)) throw new BadRequestException(`Invalid status. Allowed: ${APP_STATUSES.join(', ')}`);
    try {
      const current = await this.prisma.application.findUnique({ where: { id } });
      if (!current) throw new NotFoundException('Application not found');
      const updated = await this.prisma.application.update({ where: { id }, data: { status } });
      const actor = await this.actorId();
      if (actor) {
        await this.prisma.statusHistory.create({
          data: { entityType: 'APPLICATION', entityId: id, oldStatus: current.status, newStatus: status, reason: note ?? null, changedById: actor },
        }).catch(() => null);
      }
      return updated;
    } catch (e) {
      if (e instanceof NotFoundException || e instanceof BadRequestException) throw e;
      return { id, status };
    }
  }
}
