import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TransformInterceptor } from './core/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  const reflector = app.get(Reflector);

  //custome response
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  //Kiểm tra JWT
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  //CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  await app.listen(configService.get<string>('PORT') || 3000);
}
bootstrap();
