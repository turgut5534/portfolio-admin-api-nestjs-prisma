import { Body, Controller, Get, Post, UseGuards, Req, Param, Patch, ForbiddenException, Delete } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { JwtAuthGuard } from 'src/middlewares/jwt-guard';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Education, Experience, Profile, Project, Skill } from 'src/generated/prisma/client';
import { CreateSkillDto } from './dto/create-skill.dto';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { CreateEducationDto } from './dto/create-education.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@UseGuards(JwtAuthGuard)
@Controller('portfolio')
export class PortfolioController {

    constructor(
            private readonly portfolioService: PortfolioService,
    ) {}

    //CREATIONS

    @Post('profiles')
    async createProfile(@Body() dto: CreateProfileDto, @Req() req): Promise<Profile> {
        
        const userId = req.user.sub
        return this.portfolioService.saveProfile(dto, userId)

    }

    @Post('skills')
    async createSkill(@Body() dto: CreateSkillDto, @Req() req) : Promise<Skill>{
        const userId = req.user.sub
        return this.portfolioService.saveSkill(dto, userId)
    }

    @Post('experiences')
    async createExperience(@Body() dto: CreateExperienceDto, @Req() req) : Promise<Experience>{
        const userId = req.user.sub
        return this.portfolioService.saveExperience(dto, userId)
    }

    @Post('educations')
    async createEducation(@Body() dto: CreateEducationDto, @Req() req) : Promise<Education>{
        const userId = req.user.sub
        return this.portfolioService.saveEducation(dto, userId)
    }

    @Post('projects')
    async createProject(@Body() dto: CreateProjectDto, @Req() req) : Promise<Project>{
        const userId = req.user.sub
        return this.portfolioService.saveProject(dto, userId)
    }

    //UPDATES

    @Patch('profiles/:id')
    async updateProfile(@Param('id') id: string, @Body() dto: UpdateProfileDto, @Req() req): Promise<Profile> {
        
        const userId = req.user.sub;
        const profile = await this.portfolioService.findProfileById(id)

        if (profile.userId !== userId) throw new ForbiddenException('You cannot update this profile');

        return this.portfolioService.updateProfile(id, dto);

    }

    @Patch('skills/:id')
    async updateSkill(
        @Param('id') id: string,
        @Body() dto: UpdateSkillDto,
        @Req() req
    ): Promise<Skill> {
        const userId = req.user.sub;
        const skill = await this.portfolioService.findSkillById(id);

        if (skill.userId !== userId) throw new ForbiddenException('You cannot update this skill');

        return this.portfolioService.updateSkill(id, dto);
    }

    @Patch('experiences/:id')
    async updateExperience(
        @Param('id') id: string,
        @Body() dto: UpdateExperienceDto,
        @Req() req
    ): Promise<Experience> {
        const userId = req.user.sub;
        const exp = await this.portfolioService.findExperienceById(id);

        if (exp.userId !== userId) throw new ForbiddenException('You cannot update this experience');

        return this.portfolioService.updateExperience(id, dto);
    }

    @Patch('educations/:id')
    async updateEducation(
        @Param('id') id: string,
        @Body() dto: UpdateEducationDto,
        @Req() req
    ): Promise<Education> {
        const userId = req.user.sub;
        const edu = await this.portfolioService.findEducationById(id);

        if (edu.userId !== userId) throw new ForbiddenException('You cannot update this education');

        return this.portfolioService.updateEducation(id, dto);
    }

    @Patch('projects/:id')
    async updateProject(
        @Param('id') id: string,
        @Body() dto: UpdateProjectDto,
        @Req() req
    ): Promise<Project> {
        const userId = req.user.sub;
        const project = await this.portfolioService.findProjectById(id);

        if (project.userId !== userId) throw new ForbiddenException('You cannot update this project');

        return this.portfolioService.updateProject(id, dto);
    }

    //DELETIONS
    @Delete('profiles/:id')
    async deleteProfile(@Param('id') id: string, @Req() req) {
        const userId= req.user.sub
        return this.portfolioService.deleteProfile(id, userId)
    }

    @Delete('skills/:id')
    async deleteSkill(@Param('id') id: string, @Req() req) {
        const userId= req.user.sub
        return this.portfolioService.deleteSkill(id, userId)
    }


    @Delete('experiences/:id')
    async deleteExperience(@Param('id') id: string, @Req() req) {
        const userId= req.user.sub
        return this.portfolioService.deleteExperience(id, userId)
    }


    @Delete('educations/:id')
    async deleteEducation(@Param('id') id: string, @Req() req) {
        const userId= req.user.sub
        return this.portfolioService.deleteEducation(id, userId)
    }

    @Delete('projects/:id')
    async deleteProject(@Param('id') id: string, @Req() req) {
        const userId= req.user.sub
        return this.portfolioService.deleteProject(id, userId)
    }
}
