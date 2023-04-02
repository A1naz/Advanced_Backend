import { Module } from '@nestjs/common';
import { PersonsService } from './person.service';
import { PersonController } from './person.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Person } from './person.model';
import { AuthModule } from 'src/auth/auth.module';
import { forwardRef } from '@nestjs/common/utils';

@Module({
  providers: [PersonsService],
  controllers: [PersonController],
  imports: [SequelizeModule.forFeature([Person]), forwardRef( () => AuthModule)],
  exports: [PersonsService],
})
export class PersonModule {}
