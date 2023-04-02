import { Controller, Get, Post, Body, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { createTextBlockDto } from './create-text-block.dto';
import { TextBlockService } from './text-block.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('textblock')
export class TextBlockController {
  constructor(private textBlockService: TextBlockService) {}


  @UseInterceptors(FileInterceptor('image'))
  @Post()
  createTextBlock(@Body() dto: createTextBlockDto, @UploadedFile() image) {
   return this.textBlockService.createTextBlock(dto, image);
  }
}
