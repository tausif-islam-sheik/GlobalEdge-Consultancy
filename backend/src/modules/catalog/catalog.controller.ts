import { Controller, Get, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller()
export class CatalogController {
  constructor(private catalog: CatalogService) {}
  @Get('countries') countries(@Query('search') q?: string) { return this.catalog.countries(q); }
  @Get('institutions') institutions(@Query('search') q?: string) { return this.catalog.institutions(q); }
  @Get('programs') programs(@Query('search') q?: string) { return this.catalog.programs(q); }
  @Get('news') news() { return this.catalog.posts('NEWS'); }
  @Get('announcements') announcements() { return this.catalog.posts('ANNOUNCEMENT'); }
  @Get('blogs') blogs() { return this.catalog.posts('BLOG'); }
}
