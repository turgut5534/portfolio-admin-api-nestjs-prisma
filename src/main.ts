import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 👇 Serve static files from project root
  const uploadsPath = join(process.cwd(), 'uploads');
  app.useStaticAssets(uploadsPath, { prefix: '/uploads' });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

    const config = new DocumentBuilder()
    .setTitle('Admin API')
    .setDescription('API for managing portfolio content')
    .setVersion('1.0')
    .addBearerAuth() // if you use JWT auth
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 

  await app.listen(process.env.PORT ?? 3010);
}
bootstrap();
