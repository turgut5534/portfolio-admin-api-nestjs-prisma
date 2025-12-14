import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import type { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('info')
  async getInfo(@Req() req: Request) {

    const domain = req.headers['x-portfolio-domain'] as string;

    return this.appService.getInfo(domain);
  }
}
