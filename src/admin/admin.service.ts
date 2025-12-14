import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '../generated/prisma/client'
import * as bcrypt from 'bcrypt'
import { CreateAdminDto } from './dto/admin.dto';

@Injectable()
export class AdminService {

    constructor(private readonly prisma: PrismaService) {}

    async saveAdmin(data: CreateAdminDto): Promise<User> {

        const hashedPassword = await bcrypt.hash(data.password, 12);

        try {

          return await this.prisma.user.create({
            data: {
              email: data.email,
              password: hashedPassword,
              domain: data.domain
            },
          });
        } catch (error) {

          if (error.code === 'P2002') {
            throw new BadRequestException('Email already exists');
          }
          throw error;
        }
      }

      async findById(userId: string) {
        return this.prisma.user.findUnique({
          where: { id: userId },
          include: {
            profile: true,
            skills: true,
            educations: true,
            experiences: true,
            projects: {
              include: {
                files: true
              }
            },
            titles: true
          },
        });
      }

}
