import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Res,
  Req,
} from '@nestjs/common';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Response } from 'express';
import { IUser } from 'src/users/users.interface';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage('User login')
  @Post('login')
  async login(@Req() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response);
  }

  @Public()
  @ResponseMessage('Register a user')
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @ResponseMessage('Get user information')
  @Get('account')
  handleGetAccount(@User() user: IUser) {
    return { user };
  }

  @ResponseMessage('Get user by refresh token')
  @Get('refresh')
  handleRefershToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies['refresh_token'];
    return this.authService.processNewToken(refreshToken, response);
  }
}
