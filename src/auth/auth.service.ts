import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentials } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(authCredentials: AuthCredentials) {
    const user = await this.prisma.user.findUnique({
      where: { email: authCredentials.email },
    });

    if (user) {
      const isMatch = await bcrypt.compare(
        authCredentials.password,
        user.password,
      );

      if (isMatch) return this.jwtService.sign({ email: user.email });
    }

    throw new HttpException('Email ou senha inválida.', HttpStatus.BAD_REQUEST);
  }

  validate(auth: string) {
    if (auth) {
      const tokenDecoded: any = this.jwtService.decode(auth);
      if (tokenDecoded) {
        const expireDate = new Date(tokenDecoded.exp * 1000);
        const nowDate = new Date();

        if (expireDate > nowDate) return true;
      }

      throw new HttpException('Token inválido', HttpStatus.FORBIDDEN);
    }
    throw new HttpException('Token inválido', HttpStatus.FORBIDDEN);
  }
}
