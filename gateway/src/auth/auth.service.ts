import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // fungsi untuk login
  login(dto: AuthDto) {
    // cek apakah username & password sudah sesuai
    // jika username & password sesuai
    if (dto.username == 'admin' && dto.password == 'admin123') {
      // buat variabel payload
      const payload = {
        username: dto.username,
        password: dto.password,
      };

      return {
        success: true,
        message: 'Access Token Berhasil Dibuat',
        metadata: {
          status: HttpStatus.CREATED,
        },
        data: {
          // access_token: this.jwtService.sign(payload),
          // type_token: 'Bearer',
          // expired_token: '1m',
          access_token: this.jwtService.sign(dto, {
            secret: 'Access-IF23FX',
            expiresIn: '1m',
          }),

          refresh_token: this.jwtService.sign(payload, {
            secret: 'Refresh-IF23FX',
            expiresIn: '3m',
          }),
        },
      };
    }
    // jika username & password tidak sesuai
    else {
      throw new BadRequestException({
        success: false,
        message: 'Username / Password Salah !',
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  refresh(user: AuthDto) {
    const payload = {
      username: user.username,
      password: user.password,
    };

    return {
      success: true,
      message: 'Access Token Berhasil Dibuat',
      metadata: {
        status: HttpStatus.CREATED,
      },
      data: {
        access_token: this.jwtService.sign(payload, {
          secret: 'Access-IF23FX',
          expiresIn: '1m',
        }),
      },
    };
  }
}
