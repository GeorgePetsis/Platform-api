import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
//import { AuthorizationModule } from './authorization/authorization.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule /*AuthorizationModule*/],
  controllers: [],
  providers: [],
})
export class AppModule {}
