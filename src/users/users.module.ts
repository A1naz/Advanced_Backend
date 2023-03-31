import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { usersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [usersService],
})
export class UsersModule {}
