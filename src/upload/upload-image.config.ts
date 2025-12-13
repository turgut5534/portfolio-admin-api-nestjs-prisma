import { diskStorage } from 'multer';
import { extname } from 'path';

export const imageUploadConfig = {
  storage: diskStorage({
    destination: './uploads/images',
    filename: (_req, file, cb) => {
      const uniqueName =
        Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueName + extname(file.originalname));
    },
  }),
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image')) {
      cb(new Error('Only image files allowed'), false);
    }
    cb(null, true);
  },
};
