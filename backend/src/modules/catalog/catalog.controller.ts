import { Controller, Get, Query, Param } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller()
export class CatalogController {
  constructor(private catalog: CatalogService) {}
  @Get('countries') countries(@Query('search') q?: string) { return this.catalog.countries(q); }
  @Get('institutions') institutions(@Query('search') q?: string) { return this.catalog.institutions(q); }
  @Get('institutions/:key') institution(@Param('key') key: string) { return this.catalog.institution(key); }
  @Get('programs') programs(@Query('search') q?: string) { return this.catalog.programs(q); }
  @Get('programs/:id') program(@Param('id') id: string) { return this.catalog.program(id); }
  @Get('news') news() { return this.catalog.posts('NEWS'); }
  @Get('announcements') announcements() { return this.catalog.posts('ANNOUNCEMENT'); }
  @Get('blogs') blogs() { return this.catalog.posts('BLOG'); }
}
