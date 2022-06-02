import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
// import { AuthGuard } from '@nestjs/passport';
// import { Request } from 'express';
import { getUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
@Controller('users')
export class UserController {
  @UseGuards(JwtGuard)
  @Get('me')
  getSelf(@getUser() user: User) {
    return user;
  }
}
