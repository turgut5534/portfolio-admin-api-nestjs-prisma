import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { JwtAuthGuard } from 'src/middlewares/jwt-guard';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Education, Experience, Profile, Project, Skill } from 'src/generated/prisma/client';
import { CreateSkillDto } from './dto/create-skill.dto';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { CreateEducationDto } from './dto/create-education.dto';
import { CreateProjectDto } from './dto/create-project.dto';

@UseGuards(JwtAuthGuard)
@Controller('portfolio')
export class PortfolioController {

    constructor(
            private readonly portfolioService: PortfolioService,
    ) {}

    @Post('profile/create')
    async createProfile(@Body() dto: CreateProfileDto, @Req() req): Promise<Profile> {
        
        const userId = req.user.sub
        return this.portfolioService.saveProfile(dto, userId)

    }

    @Post('skill/create')
    async createSkill(@Body() dto: CreateSkillDto, @Req() req) : Promise<Skill>{
        const userId = req.user.sub
        return this.portfolioService.saveSkill(dto, userId)
    }

    @Post('experience/create')
    async createExperience(@Body() dto: CreateExperienceDto, @Req() req) : Promise<Experience>{
        const userId = req.user.sub
        return this.portfolioService.saveExperience(dto, userId)
    }

    @Post('education/create')
    async createEducation(@Body() dto: CreateEducationDto, @Req() req) : Promise<Education>{
        const userId = req.user.sub
        return this.portfolioService.saveEducation(dto, userId)
    }

    @Post('project/create')
    async createProject(@Body() dto: CreateProjectDto, @Req() req) : Promise<Project>{
        const userId = req.user.sub
        return this.portfolioService.saveProject(dto, userId)
    }
}
