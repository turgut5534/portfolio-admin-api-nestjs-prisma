import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Education, Experience, Profile, Project, Skill } from 'src/generated/prisma/client';
import { CreateSkillDto } from './dto/create-skill.dto';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { CreateEducationDto } from './dto/create-education.dto';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class PortfolioService {
    
    constructor(private readonly prisma: PrismaService) {}

    async saveProfile(data:CreateProfileDto, userId: string): Promise<Profile> {
     
        return this.prisma.profile.create({
            data: {
                ...data,
                userId
            }
        })
        
    }

    async saveSkill(data:CreateSkillDto, userId: string): Promise<Skill> {

        return this.prisma.skill.create({
            data: {
                ...data,
                userId
            }
        })
        
    }

    async saveExperience(data:CreateExperienceDto, userId: string): Promise<Experience> {

        return this.prisma.experience.create({
            data: {
                ...data,
                userId
            }
        })
        
    }

    async saveEducation(data:CreateEducationDto, userId: string): Promise<Education> {

        return this.prisma.education.create({
            data: {
                ...data,
                userId
            }
        })
        
    }

    async saveProject(data:CreateProjectDto, userId: string): Promise<Project> {

        return this.prisma.project.create({
            data: {
                ...data,
                userId
            }
        })
        
    }

}
