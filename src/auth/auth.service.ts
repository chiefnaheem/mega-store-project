/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  login() {
    return 'i am signed in';
  }
  register(dto: AuthDto) {
    return 'i am signed up';
  }
}
