import { Module } from '@nestjs/common';
import { PersonsService } from './person.service';
import { PersonController } from './person.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Person } from './person.model';

@Module({
  providers: [PersonsService],
  controllers: [PersonController],
  imports: [SequelizeModule.forFeature([Person])],
  exports: [PersonsService],
})
export class PersonModule {}
