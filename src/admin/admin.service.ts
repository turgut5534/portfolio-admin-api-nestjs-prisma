import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Role, User } from '../generated/prisma/client'
import * as bcrypt from 'bcrypt'
import { CreateAdminDto } from './dto/admin.dto';

@Injectable()
export class AdminService {

    constructor(private readonly prisma: PrismaService) {}


    async getAllAdmins(): Promise<User[]> {
      return this.prisma.user.findMany();
    }

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
            throw new BadRequestException('An error occurred');
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

      async deleteAdmin(id: string) {

        return this.prisma.user.delete({where: {
          id
        }})

      }

      async changePassword(id: string, password: string): Promise<User> {

        const user = await this.prisma.user.findUnique({where: {id}})

        const hashedPassword = await bcrypt.hash(password, 12);

        return this.prisma.user.update({
          where: {
            id
          },
          data: {
            password: hashedPassword
          }
        })

      }

        async changePasswordbyForce(id: string, password: string): Promise<User> {

        const user = await this.prisma.user.findUnique({where: {id}})

        const hashedPassword = await bcrypt.hash(password, 12);

        return this.prisma.user.update({
          where: {
            id
          },
          data: {
            password: hashedPassword
          }
        })

      }

}
