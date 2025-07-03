import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TransformInterceptor } from './core/transform.interceptor';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
 //cho phep ben ngoai co the xem duoc file
 app.useStaticAssets(join(__dirname, '..','public')) //css.js.image

  app.useGlobalPipes(new ValidationPipe());
  const reflector = app.get(Reflector);

  //custome response
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  //Kiểm tra JWT
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  //CORS
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
  });

  //config versioning
  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1'],
    // prefix: 'api/v'
  });

  //config cookie
  app.use(cookieParser());
  await app.listen(configService.get<string>('PORT') || 8000);

 
}
bootstrap();
