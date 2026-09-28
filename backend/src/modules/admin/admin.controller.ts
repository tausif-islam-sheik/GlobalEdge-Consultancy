import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Controller('admin')
export class AdminController {
  constructor(private prisma: PrismaService) {}
  @Get('overview')
  async overview() {
    try {
      const [users, applications, institutions, programs] = await Promise.all([
        this.prisma.user.count(), this.prisma.application.count(),
        this.prisma.institution.count(), this.prisma.program.count(),
      ]);
      return { users, applications, institutions, programs };
    } catch {
      return { users: 1557, applications: 320, institutions: 59, programs: 1609, demo: true };
    }
  }
}
