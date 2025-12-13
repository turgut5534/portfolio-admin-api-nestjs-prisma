import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/middlewares/jwt-guard';
import { UploadService } from './upload.service';
import { imageUploadConfig } from './upload-image.config';
import { cvUploadConfig } from './upload-file.config';
import { PortfolioService } from 'src/portfolio/portfolio.service';

@UseGuards(JwtAuthGuard)
@Controller('upload')
export class UploadController {
    constructor(
    private readonly uploadService: UploadService,
    private readonly portfolioService: PortfolioService, // <- inject here
  ) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file', imageUploadConfig))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return {
      url: this.uploadService.buildImageUrl(file.filename),
    };
  }

  @Post('cv')
  @UseInterceptors(FileInterceptor('file', cvUploadConfig))
  async uploadCv(@UploadedFile() file: Express.Multer.File, @Req() req) {

    const userId = req.user.sub

    const profile = await this.portfolioService.saveCvFile(userId, file.filename)

    return {
      url: this.uploadService.buildCvUrl(file.filename),
      profile
    };
  }
}
