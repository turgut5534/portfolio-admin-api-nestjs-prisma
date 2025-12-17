import { Body, Controller, Get, Post, UseGuards, Req, Delete, Param, Patch } from '@nestjs/common';
import { AdminService } from './admin.service'
import { User } from 'src/generated/prisma/client';
import { ApiKeyGuard } from 'src/middlewares/api-key.guard';
import { CreateAdminDto } from './dto/admin.dto';
import { JwtAuthGuard } from 'src/middlewares/jwt-guard';
import { RolesGuard } from './helpers/roles.guard';
import { Role } from 'src/generated/prisma/client';
import { Roles } from './helpers/roles.decorator';

@Controller('admin')
export class AdminController {

    constructor(
        private readonly adminService: AdminService,
  ) {}


    @Get('users/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async getUserById(@Param('id') id) {

        return this.adminService.findById(id)
    }


    @Get('all')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async getAllAdmins(): Promise<User[]> {

        return this.adminService.getAllAdmins()
    }

    @Post('save')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async saveAdmin(@Body() dto: CreateAdminDto ): Promise<User> {

      console.log('wokrin')
        return this.adminService.saveAdmin(dto)
    }

    @Delete('delete/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async deleteAdmin(@Param('id') id): Promise<User> {

        return this.adminService.deleteAdmin(id)
    }

    @UseGuards(JwtAuthGuard)
    @Get('dashboard')
    async getDashboard(@Req() req) {
        const userId = req.user.sub
        const user = await this.adminService.findById(userId)
        return user
  }

    @Post('password')
    @UseGuards(JwtAuthGuard)
    async changePassword(@Req() req, @Body() body: any) {

      const id = req.user.sub
      const password = body.password

      return this.adminService.changePassword(id, password)

    }

      @Post('password/force')
      @UseGuards(ApiKeyGuard)
      async changePasswordbyForce(@Body() body: any) {

      const password = body.password
      const id = body.id

      return this.adminService.changePasswordbyForce(id,password)

    }

    @Patch('users/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async updateUser(@Param('id') id, @Body() body: any): Promise<User> {

      return this.adminService.updateUser(id, body)

    }
}
