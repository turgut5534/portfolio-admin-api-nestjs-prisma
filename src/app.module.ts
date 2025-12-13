import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { PortfolioController } from './portfolio/portfolio.controller';
import { PortfolioModule } from './portfolio/portfolio.module';

@Module({
  imports: [AdminModule, AuthModule, PortfolioModule],
  controllers: [AppController, PortfolioController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
