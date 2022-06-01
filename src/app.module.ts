import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { AuthModule } from './auth/auth.module';
// import { AuthController } from './auth/auth.controller';
// import { AuthService } from './auth/auth.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, UserModule, BookmarkModule, PrismaModule],
  // controllers: [AuthController],
  // providers: [AuthService],
  // imports: [PrismaModule],
})
export class AppModule {}
