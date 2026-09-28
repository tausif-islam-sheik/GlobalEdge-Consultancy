import { Module } from '@nestjs/common';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { PrismaService } from '../../common/prisma.service';

@Module({ controllers: [ApplicationsController], providers: [ApplicationsService, PrismaService] })
export class ApplicationsModule {}
