import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as passportJwt from 'passport-jwt';
import { AuthDto } from '../dto/auth.dto';

const { ExtractJwt, Strategy } = passportJwt;

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'Access-IF23FX',
    });
  }

  // fungsi untuk validasi jwt
  validate(payload: AuthDto) {
    return payload;
  }
}
