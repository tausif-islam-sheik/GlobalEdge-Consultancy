import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { ApplicationsModule } from './modules/applications/applications.module';
import { AdminModule } from './modules/admin/admin.module';
import { PrismaModule } from './common/prisma.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthModule, CatalogModule, ApplicationsModule, AdminModule],
})
export class AppModule {}
