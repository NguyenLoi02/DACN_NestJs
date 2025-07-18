import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './passport/jwt.strategy';
import ms from 'ms';
import { AuthController } from './auth.controller';
import { RolesModule } from 'src/roles/roles.module';
@Module({
  // imports: [
  //   UsersModule,
  //   PassportModule,
  //   JwtModule.registerAsync({
  //     imports: [ConfigModule],
  //     useFactory: async (configService: ConfigService) => ({
  //       secret: configService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
  //       signOptions: {
  //         expiresIn: configService.get('JWT_EXPIRE')
  //       },
  //     }),
  //     inject: [ConfigService],
  //   }),
  // ],

  imports: [
    UsersModule,
    PassportModule,
    RolesModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const jwtExpire = configService.get<string>('JWT_EXPIRE') ?? '1h';
        const ms = require('ms'); // ✅ dùng CommonJS chuẩn 100% không lỗi

        return {
          secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
          signOptions: {
            expiresIn: ms(configService.get('JWT_EXPIRE') ?? '1h') / 1000
          },
        };
      },
    }),
  ],
  providers: [AuthService, LocalStrategy,JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
