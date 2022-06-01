/* eslint-disable @typescript-eslint/no-empty-function */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async login(dto: AuthDto) {
    //find the user by email
    const user = this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('User not found');
    //compare the password
    const isValid = argon.verify((await user).hash, dto.password);
    if (!isValid) throw new ForbiddenException('Invalid credentials');
    //return the user;
    delete (await user).hash;
    return user;
  }
  async register(dto: AuthDto) {
    //generate password hash
    const passwordHash = await argon.hash(dto.password);

    //save the user in the database
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: passwordHash,
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
        //delete user.hash
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'User already exists with the credentials',
          );
        }
        throw Error;
      }
    }
  }
}
