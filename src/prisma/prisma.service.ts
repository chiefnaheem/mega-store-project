import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://postgres-naheem:12345678@localhost:5435/megastore-db?schema=public',
        },
      },
    });
  }
}
