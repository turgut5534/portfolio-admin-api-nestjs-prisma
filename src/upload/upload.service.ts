import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { join } from 'path';
import { promises as fs } from 'fs';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UploadService {

  constructor(private readonly prisma: PrismaService) {}
  
  imageStorage() {
    return diskStorage({
      destination: './uploads/images',
      filename: (_req, file, cb) => {
        const uniqueName =
          Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueName + extname(file.originalname));
      },
    });
  }

  imageFileFilter(
    _req: any,
    file: Express.Multer.File,
    cb: Function,
  ) {
    if (!file.mimetype.startsWith('image')) {
      cb(new Error('Only image files allowed'), false);
    }
    cb(null, true);
  }

  buildImageUrl(filename: string) {
    return `/uploads/images/${filename}`;
  }

  buildCvUrl(filename: string) {
    return `/uploads/cv/${filename}`;
  }


    async saveCvFile(userId: string, cvUrl: string) {

        const profile = await this.prisma.profile.findUnique({
        where: { userId },
        });

        if (!profile) throw new Error('Profile not found');

        if (profile.cvUrl) {

            const oldFilePath = join(process.cwd(), 'uploads/cv/', profile.cvUrl);

            try {
                await fs.unlink(oldFilePath);
            } catch (err) {
                // File may not exist, just log the error
                console.warn('Old CV file not found:', err.message);
            }
        }

        const updatedProfile = await this.prisma.profile.update({
            where: { userId },
            data: { cvUrl },
        });
   
        return updatedProfile

    }
}
