import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TextBlockController } from './text-block.controller';
import { TextBlockService } from './text-block.service';

import { FilesModule } from 'src/files/files.module';
import { TextBlock } from './text-block.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TextBlockController],
  providers: [TextBlockService],
  imports: [SequelizeModule.forFeature([TextBlock]), FilesModule, AuthModule]
})
export class TextBlockModule {}
