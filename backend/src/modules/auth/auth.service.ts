import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(dto: any) {
    const exists = await this.prisma.user.findUnique({ where: { email: dto.email } }).catch(() => null);
    if (exists) throw new ConflictException('Email already registered');
    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: { name: dto.name, email: dto.email, password: hash, role: dto.role || 'STUDENT', passportNumber: dto.passportNumber || null },
    });
    return { id: user.id, email: user.email, role: user.role };
  }

  async login(dto: any) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } }).catch(() => null);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) throw new UnauthorizedException('Invalid credentials');
    const token = await this.jwt.signAsync({ sub: user.id, role: user.role });
    return { access_token: token, user: { id: user.id, email: user.email, role: user.role, name: user.name } };
  }
}
