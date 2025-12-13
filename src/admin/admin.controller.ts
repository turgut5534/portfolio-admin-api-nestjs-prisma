import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service'
import { Prisma, User } from 'src/generated/prisma/client';
import { ApiKeyGuard } from 'src/middlewares/api-key.guard';
import { CreateAdminDto } from './dto/admin.dto';

@Controller('admin')
export class AdminController {

    constructor(
        private readonly adminService: AdminService,
  ) {}

    @Post('save')
    @UseGuards(ApiKeyGuard)
    async saveAdmin(@Body() dto: CreateAdminDto ): Promise<User> {

        return this.adminService.saveAdmin(dto)
    }
}
