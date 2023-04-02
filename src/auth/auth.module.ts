import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PersonModule } from 'src/person/person.module';
import { JwtModule } from '@nestjs/jwt';
import { forwardRef } from '@nestjs/common/utils';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef( () => UsersModule ),
    forwardRef( () => PersonModule ),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'A_LArge_sECreT',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [
    AuthService, JwtModule
  ]
})
export class AuthModule {}
