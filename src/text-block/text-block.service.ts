import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { createTextBlockDto } from './create-text-block.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TextBlock } from './text-block.model';
import { FilesService } from 'src/files/files.service';
import { groupDto } from './group.dto';

@Injectable()
export class TextBlockService {
  constructor(
    @InjectModel(TextBlock) private textBlockRepository: typeof TextBlock,
    private fileService: FilesService
  ) {}

  async createTextBlock(dto: createTextBlockDto, image: any) {
    try {
      const fileName = await this.fileService.createFile(image);
      const textBlock = await this.textBlockRepository.create({
        ...dto,
        image: fileName,
      });
      return textBlock;
    } catch (err) {
      throw new HttpException(
        'Некорректные данные или данное имя уже занято',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async updateTextBlock(dto: createTextBlockDto, image: any) {
    try {
      const textBlock = await this.textBlockRepository.findOne({
        where: { id: dto.id },
      });
      if (!image) {
        textBlock.update(dto);
      } else {
        const fileName = await this.fileService.createFile(image);
        textBlock.update({ ...dto, image: fileName });
      }
      return textBlock;
    } catch (err) {
      throw new HttpException(
        'Некорректные данные или данного блока не существует',
        HttpStatus.NOT_MODIFIED
      );
    }
  }

  async deleteTextBlock(id: string) {
    try {
      const textBlock = await this.textBlockRepository.findByPk(Number(id));
      await this.fileService.deleteFIle(textBlock.image)
      await textBlock.destroy();
      return textBlock;
    } catch (error) {
      throw new HttpException('Некорректные данные или данного блока уже не существует', HttpStatus.NOT_FOUND)
    }
  }

  async getTextBlockByGroup(group: groupDto){
    try {
      return await this.textBlockRepository.findAll({where : {group: group.group}})
    } catch (error) {
      throw new HttpException('Некорректные данные или блоков с данной группой не существует', HttpStatus.NOT_FOUND)
    }
   
  }
}
