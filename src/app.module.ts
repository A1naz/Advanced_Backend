import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from './users/users.model';
import { Person } from './person/person.model';
import { TextBlock } from './text-block/text-block.model';

import { UsersModule } from './users/users.module';
import { PersonModule } from './person/person.module';
import { AuthModule } from './auth/auth.module';
import { TextBlockModule } from './text-block/text-block.module';
import { FilesModule } from './files/files.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Person, TextBlock],
      autoLoadModels: true,
    }),
    UsersModule,
    PersonModule,
    AuthModule,
    TextBlockModule,
    FilesModule,
  ],
})
export class appModule {}
