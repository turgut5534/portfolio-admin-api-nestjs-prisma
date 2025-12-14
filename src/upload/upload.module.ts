import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { AuthModule } from 'src/auth/auth.module';
import { PortfolioModule } from 'src/portfolio/portfolio.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [AuthModule, PortfolioModule],
  controllers: [UploadController],
  providers: [UploadService, PrismaService],
  exports: [UploadService]
})
export class UploadModule {}
