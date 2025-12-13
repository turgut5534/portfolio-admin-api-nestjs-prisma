import { Injectable } from '@nestjs/common';
import { User } from './generated/prisma/client';
import { PrismaService } from './prisma.service';

import * as dotenv from 'dotenv';
dotenv.config(); 

@Injectable()
export class AppService {

  constructor(private readonly prisma: PrismaService) {}

  async getInfo(domain: string) {
    return this.prisma.user.findUniqueOrThrow({
    where: { domain },
    include: {
      profile: true,
      skills: true,
      educations: true,
      experiences: true,
      projects: true,
    },
  });
  }
}
