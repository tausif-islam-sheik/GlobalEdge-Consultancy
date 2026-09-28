import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { ApplicationsModule } from './modules/applications/applications.module';
import { AdminModule } from './modules/admin/admin.module';
import { PrismaService } from './common/prisma.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, CatalogModule, ApplicationsModule, AdminModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
