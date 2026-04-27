import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(dto: AuthDto) {
    const payload = {
      username: dto.username,
      password: dto.password,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
