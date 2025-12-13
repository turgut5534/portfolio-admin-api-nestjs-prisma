import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class UploadService {
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
}
