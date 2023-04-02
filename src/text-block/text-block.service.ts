import { Injectable } from '@nestjs/common';
import { createTextBlockDto } from './create-text-block.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TextBlock } from './text-block.model';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class TextBlockService {
  constructor(
   @InjectModel(TextBlock) private textBlockRepository: typeof TextBlock, private fileService: FilesService) {}

  async createTextBlock(dto: createTextBlockDto, image: any) {
    const fileName = await this.fileService.createFile(image)
    const textBlock = await this.textBlockRepository.create({...dto, image: fileName});
    return textBlock;
  }
}
