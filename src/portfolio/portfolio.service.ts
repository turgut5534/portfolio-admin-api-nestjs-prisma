import { Injectable, ForbiddenException} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Education, Experience, Profile, Project, ProjectFiles, Skill, Title } from 'src/generated/prisma/client';
import { CreateSkillDto } from './dto/create-skill.dto';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { CreateEducationDto } from './dto/create-education.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateTitleDto } from './dto/create-title.dto';
import { UpdateTitleDto } from './dto/update-title.dto';
import { join } from 'path';
import { promises as fs } from 'fs';

@Injectable()
export class PortfolioService {
    
    constructor(private readonly prisma: PrismaService) {}

    //FINDING 
    async findProfileById(id: string): Promise<Profile>{

        const profile = await this.prisma.profile.findUniqueOrThrow({
            where: {
                id
            }
        })

        return profile
    }

    async findSkillById(id: string): Promise<Skill>{

        const profile = await this.prisma.skill.findUniqueOrThrow({
            where: {
                id
            }
        })

        return profile
    }

    async findExperienceById(id: string): Promise<Experience>{

        const profile = await this.prisma.experience.findUniqueOrThrow({
            where: {
                id
            }
        })

        return profile
    }

    async findEducationById(id: string): Promise<Education>{

        const profile = await this.prisma.education.findUniqueOrThrow({
            where: {
                id
            }
        })

        return profile
    }

    async findProjectById(id: string): Promise<Project>{

        const profile = await this.prisma.project.findUniqueOrThrow({
            where: {
                id
            }
        })

        return profile
    }
    
    async findTitleById(id: string): Promise<Title>{

        const title = await this.prisma.title.findUniqueOrThrow({
            where: {
                id
            }
        })

        return title
    }

    //FIND MULTIPLE

    async getProfile(userId): Promise<Profile | null> {

        return this.prisma.profile.findUnique({
            where: {
                userId
            }
        })

    }

    async getSkills(userId): Promise<Skill[]> {

        return this.prisma.skill.findMany({
            where: {
                userId
            }
        })

    }

    async getEducations(userId): Promise<Education[]> {

        return this.prisma.education.findMany({
            where: {
                userId
            }
        })

    }

    async getProjects(userId): Promise<Project[]> {

        return this.prisma.project.findMany({
            where: {
                userId
            }
        })

    }

    async getTitles(userId): Promise<Title[]> {

        return this.prisma.title.findMany({
            where: {
                userId
            }
        })

    }

    async getProjectFiles(userId: string, projectId: string): Promise<ProjectFiles[]> {

        const project= await this.prisma.project.findFirst({
            where: {
                userId
            }
        })

        if(!project) {
            throw new Error('Project not found');
        }

        return this.prisma.projectFiles.findMany({
            where: {
                projectId
            }
        })

    }

    // CREATING
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

    async saveTitle(data:CreateTitleDto, userId: string): Promise<Title> {

        return this.prisma.title.create({
            data: {
                ...data,
                userId
            }
        })
        
    }

    //UPDATING
    async updateProfile(id: string, dto: UpdateProfileDto) {
        return this.prisma.profile.update({
            where: { id },
            data: dto, 
        });
    }
    
    async updateSkill(id: string, dto: UpdateSkillDto) {
        
        return this.prisma.skill.update({
            where: { id },
            data: dto, 
        });
    }
    

    async updateExperience(id: string, dto: UpdateExperienceDto) {
        return this.prisma.experience.update({
            where: { id },
            data: dto, 
        });
    }

    async updateEducation(id: string, dto: UpdateEducationDto) {
        return this.prisma.education.update({
            where: { id },
            data: dto, 
        });
    }
    
    async updateProject(id: string, dto: UpdateProjectDto) {
        return this.prisma.project.update({
            where: { id },
            data: dto, 
        });
    }

    async updateTitle(id: string, dto: UpdateTitleDto) {
        return this.prisma.title.update({
            where: { id },
            data: dto, 
        });
    }
    

    //DELETIONS

    async deleteProfile(id: string, userId: string) {

        const profile = await this.prisma.profile.findUnique({where: {
            id
        }})

        if(!profile || profile.userId !== userId) {
            throw new ForbiddenException('You cannot delete this project');
        }

        return this.prisma.profile.delete({where: {id}})
    }
   
    async deleteSkill(id: string, userId: string) {

        const skill = await this.prisma.skill.findUnique({where: {
            id
        }})

        if(!skill || skill.userId !== userId) {
            throw new ForbiddenException('You cannot delete this project');
        }

        return this.prisma.skill.delete({where: {id}})
    }

    async deleteExperience(id: string, userId: string) {

        const experience = await this.prisma.experience.findUnique({where: {
            id
        }})

        if(!experience || experience.userId !== userId) {
            throw new ForbiddenException('You cannot delete this project');
        }

        return this.prisma.experience.delete({where: {id}})
    }

    async deleteEducation(id: string, userId: string) {

        const education = await this.prisma.education.findUnique({where: {
            id
        }})

        if(!education || education.userId !== userId) {
            throw new ForbiddenException('You cannot delete this project');
        }

        return this.prisma.education.delete({where: {id}})
    }

    async deleteProject(id: string, userId: string) {

        const project = await this.prisma.project.findUnique({where: {
            id
        }})

        if(!project || project.userId !== userId) {
            throw new ForbiddenException('You cannot delete this project');
        }

        return this.prisma.project.delete({where: {id}})
    }

    async deleteTitle(id: string, userId: string) {

        const title = await this.prisma.title.findUnique({where: {
            id
        }})

        if(!title || title.userId !== userId) {
            throw new ForbiddenException('You cannot delete this project');
        }

        return this.prisma.title.delete({where: {id}})
    }

    async deleteProjectFile(fileId: string, userId: string) {

        const projectFile = await this.prisma.projectFiles.findFirst({where: {
            id : fileId,
            project: {
                userId
            }
        },
        include: {
            project: true
        }
        })

        if (!projectFile) {
            throw new Error('Project file not found or does not belong to the user');
        }


        const oldFilePath = join(process.cwd(), 'uploads/images/', projectFile.url);

        try {
            await fs.unlink(oldFilePath);
        } catch (err) {
            console.warn('Old image file not found:', err.message);
        }
        

        return this.prisma.projectFiles.delete({
            where: { id: fileId }
        });
        
    }

}
