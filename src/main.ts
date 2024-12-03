  import { NestFactory } from '@nestjs/core';
  import { AppModule } from './app.module';
  import { AllExceptionsFilter } from './common/middlewares/error.middleware';
  import { ValidationPipe } from '@nestjs/common';

  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
      // Enable CORS
    app.enableCors({
      origin: process.env.FRONTEND_URL,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });
    await app.listen(process.env.PORT ?? 3000);
  }
  bootstrap();