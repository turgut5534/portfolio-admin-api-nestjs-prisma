import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service'
import { Prisma, User } from 'src/generated/prisma/client';
import { ApiKeyGuard } from 'src/middlewares/api-key.guard';

@Controller('admin')
export class AdminController {

    constructor(private readonly adminService: AdminService) {}

    @Post('save')
    @UseGuards(ApiKeyGuard)
    getHello(@Body() data: Prisma.UserCreateInput): Promise<User> {
        return this.adminService.saveAdmin(data)
    }
}
