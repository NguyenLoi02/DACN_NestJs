import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService,) {
    //lấy jwt
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_ACCESS_TOKEN_SECRET") ||'asasd',
    });
  }
//hàm giải mã (decode)
async validate(payload: IUser) {
  const { _id, name, email, role } = payload;
  //gán và res.user
  return {
      _id,
      name,
      email,
      role
  };
}

}