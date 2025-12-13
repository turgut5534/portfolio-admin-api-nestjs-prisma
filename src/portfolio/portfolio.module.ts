import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PrismaService } from 'src/prisma.service';
import { PortfolioController } from './portfolio.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [PortfolioController],
  providers: [PortfolioService, PrismaService],
  exports: [PortfolioService]
})
export class PortfolioModule {}
