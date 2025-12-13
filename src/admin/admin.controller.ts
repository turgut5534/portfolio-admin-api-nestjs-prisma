import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AdminService } from './admin.service'
import { User } from 'src/generated/prisma/client';
import { ApiKeyGuard } from 'src/middlewares/api-key.guard';
import { CreateAdminDto } from './dto/admin.dto';
import { JwtAuthGuard } from 'src/middlewares/jwt-guard';

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

    @UseGuards(JwtAuthGuard)
    @Get('dashboard')
    async getDashboard(@Req() req) {
        const userId = req.user.sub
        const user = await this.adminService.findById(userId)
        return user
  }
}
