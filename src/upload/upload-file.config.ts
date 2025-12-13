import { diskStorage } from 'multer';
import { extname } from 'path';

export const cvUploadConfig = {
  storage: diskStorage({
    destination: './uploads/cv',
    filename: (_req, file, cb) => {
      const uniqueName =
        Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueName + extname(file.originalname));
    },
  }),
  fileFilter: (_req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      cb(new Error('Only PDF files are allowed'), false);
    }
    cb(null, true);
  },
};
