import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '../generated/prisma/client'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AdminService {

    constructor(private readonly prisma: PrismaService) {}

    async saveAdmin(data: Prisma.UserCreateInput): Promise<User> {
        
        const hashedPassword = await bcrypt.hash(data.password, 12)

        data.password = hashedPassword

        return this.prisma.user.create({data})

    }

}
