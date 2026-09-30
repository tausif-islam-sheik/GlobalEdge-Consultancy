import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../common/prisma.service';
import { LoginDto, RegisterDto } from './dto';

const SELF_SIGNUP_ROLES = ['STUDENT', 'AGENT', 'INSTITUTION_STAFF'] as const;

function splitName(name: string) {
  const parts = name.trim().split(/\s+/);
  return { first: parts[0] || 'Unknown', last: parts.slice(1).join(' ') || 'User' };
}

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(dto: RegisterDto) {
    if (!dto.email || !dto.password || !dto.name) throw new BadRequestException('Name, email and password are required');
    const role = dto.role || 'STUDENT';
    if (!SELF_SIGNUP_ROLES.includes(role as any)) throw new BadRequestException('Invalid role for self signup');
    const exists = await this.prisma.user.findUnique({ where: { email: dto.email } }).catch(() => null);
    if (exists) throw new ConflictException('Email already registered');
    const roleRow = await this.prisma.role.findUnique({ where: { name: role } }).catch(() => null);
    if (!roleRow) throw new BadRequestException(`Role ${role} is not configured yet`);
    const hash = await bcrypt.hash(dto.password, 10);
    const { first, last } = splitName(dto.name);
    const user = await this.prisma.user.create({
      data: { email: dto.email, password: hash, roleId: roleRow.id },
    });
    if (role === 'STUDENT') {
      await this.prisma.student.create({
        data: { userId: user.id, firstName: first, lastName: last, email: dto.email, passportNumber: dto.passportNumber || null },
      }).catch(() => null);
    } else if (role === 'AGENT') {
      await this.prisma.agent.create({
        data: { userId: user.id, agencyName: `${dto.name}'s Agency`, ownerName: dto.name, location: 'Bangladesh' },
      }).catch(() => null);
    }
    return { id: user.id, email: user.email, role };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { role: true, studentProfile: true, agentProfile: true, adminProfile: true },
    }).catch(() => null);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) throw new UnauthorizedException('Invalid credentials');
    if (user.status !== 'ACTIVE') throw new UnauthorizedException(`Account is ${user.status}`);
    const role = user.role.name;
    const name =
      user.studentProfile ? `${user.studentProfile.firstName} ${user.studentProfile.lastName}` :
      user.agentProfile ? user.agentProfile.ownerName :
      user.adminProfile ? `${user.adminProfile.firstName} ${user.adminProfile.lastName}` : user.email;
    await this.prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date(), failedLoginAttempts: 0 } }).catch(() => null);
    const token = await this.jwt.signAsync({ sub: user.id, role });
    return { access_token: token, user: { id: user.id, email: user.email, role, name } };
  }
}
