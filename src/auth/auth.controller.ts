import { Public, ResponseMessage } from 'src/decorator/customize';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Controller, Get, Post, UseGuards ,Request, Body, Res, Req} from '@nestjs/common';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Response } from 'express';


@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage('User login')
  @Post('login')
  async login(@Req() req,@Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user,response);
  }

  @Public()
  @ResponseMessage('Register a user')
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
