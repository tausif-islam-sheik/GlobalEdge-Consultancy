import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../common/prisma.service';
import { LoginDto, RegisterDto } from './dto';

const SELF_SIGNUP_ROLES = ['STUDENT', 'AGENT', 'INSTITUTION_STAFF'] as const;

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(dto: RegisterDto) {
    if (!dto.email || !dto.password || !dto.name) throw new BadRequestException('Name, email and password are required');
    const role = dto.role || 'STUDENT';
    if (!SELF_SIGNUP_ROLES.includes(role as any)) throw new BadRequestException('Invalid role for self signup');
    const exists = await this.prisma.user.findUnique({ where: { email: dto.email } }).catch(() => null);
    if (exists) throw new ConflictException('Email already registered');
    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: { name: dto.name, email: dto.email, password: hash, role: role as any, passportNumber: dto.passportNumber || null },
    });
    return { id: user.id, email: user.email, role: user.role };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } }).catch(() => null);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) throw new UnauthorizedException('Invalid credentials');
    const token = await this.jwt.signAsync({ sub: user.id, role: user.role });
    return { access_token: token, user: { id: user.id, email: user.email, role: user.role, name: user.name } };
  }
}
