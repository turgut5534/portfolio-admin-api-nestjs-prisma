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
    select: {
      profile: true,

      skills: {
        orderBy: {
          createdAt: 'asc',
        },
      },

      educations: {
        orderBy: {
          startDate: 'desc',
        },
      },

      experiences: {
        orderBy: {
          startDate: 'desc',
        },
      },

      projects: {
        orderBy: {
          updatedAt: 'asc',
        },
      },

      titles: {
        orderBy: {
          createdAt: 'asc',
        },
      },

      settings: true,
    },
  });
}


async getProjectById(id: string) {
  return this.prisma.project.findUnique({
    where: { id },
    include: {
      user: {
        include: {
          profile: {
            select: {
              fullName: true
            }
          }
        }
      }
    }
  });
}


}
