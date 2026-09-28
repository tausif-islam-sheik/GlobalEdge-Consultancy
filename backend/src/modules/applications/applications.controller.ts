import { Controller, Get, Post, Patch, Query, Body, Param } from '@nestjs/common';
import { ApplicationsService } from './applications.service';

@Controller('applications')
export class ApplicationsController {
  constructor(private apps: ApplicationsService) {}
  @Get('track') track(@Query('passport') passport: string) { return this.apps.track(passport); }
  @Post() create(@Body() dto: any) { return this.apps.create(dto); }
  @Patch(':id/status') update(@Param('id') id: string, @Body() b: any) { return this.apps.updateStatus(id, b.status, b.note); }
}
