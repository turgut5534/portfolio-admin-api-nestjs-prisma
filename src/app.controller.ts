import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import type { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('info')
  async getInfo(@Body() body) {

    return this.appService.getInfo(body.domain);
  }
}
