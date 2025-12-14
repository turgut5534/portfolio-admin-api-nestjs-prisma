import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
  Param
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/middlewares/jwt-guard';
import { UploadService } from './upload.service';
import { imageUploadConfig } from './upload-image.config';
import { cvUploadConfig } from './upload-file.config';

@UseGuards(JwtAuthGuard)
@Controller('upload')
export class UploadController {
    constructor(
    private readonly uploadService: UploadService,
  ) {}

  @Post('profile')
  @UseInterceptors(FileInterceptor('file', imageUploadConfig))
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Req() req) {

    const userId = req.user.sub
    const profile = await this.uploadService.saveProfileImage(userId, file.filename)

    return {
      url: this.uploadService.buildImageUrl(file.filename),
      profile
    };
  }

  @Post('cv')
  @UseInterceptors(FileInterceptor('file', cvUploadConfig))
  async uploadCv(@UploadedFile() file: Express.Multer.File, @Req() req) {

    const userId = req.user.sub

    const profile = await this.uploadService.saveCvFile(userId, file.filename)

    return {
      url: this.uploadService.buildCvUrl(file.filename),
      profile
    };
  }

  @Post('projects/:id')
  @UseInterceptors(FileInterceptor('file', imageUploadConfig))
  async uploadProjectFile(@UploadedFile() file: Express.Multer.File, @Param('id') id ,@Req() req) {

    const userId = req.user.sub

    const projectFile = await this.uploadService.saveProjectFile(userId, id, file.filename)

    return {
      url: this.uploadService.buildImageUrl(file.filename),
      projectFile
    };
  }
}
