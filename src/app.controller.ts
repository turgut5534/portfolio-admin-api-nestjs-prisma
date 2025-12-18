import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import type { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('info')
  async getInfo(@Body() body) {

    return this.appService.getInfo(body.domain);
  }

  @Get('project/:id')
  async getProject(@Param('id') id) {

    return this.appService.getProjectById(id);
  }
}
