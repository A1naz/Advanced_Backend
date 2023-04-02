import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { createTextBlockDto } from './create-text-block.dto';
import { TextBlockService } from './text-block.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Delete, Param, UseGuards } from '@nestjs/common/decorators';
import { RolesGuard } from 'src/auth/roles.guard';
import { ROLES } from 'src/auth/roles.auth.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { groupDto } from './group.dto';

@Controller('textblock')
export class TextBlockController {
  constructor(private textBlockService: TextBlockService) {}

  @Post()
  @ROLES('ADMIN')
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('image'))
  createTextBlock(@Body() dto: createTextBlockDto, @UploadedFile() image) {
    return this.textBlockService.createTextBlock(dto, image);
  }

  @Put()
  @ROLES('ADMIN')
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('image'))
  updateTextBlock(@Body() dto: createTextBlockDto, @UploadedFile() image) {
    return this.textBlockService.updateTextBlock(dto, image);
  }

  @ROLES('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  deleteTextBlock(@Param('id') id: string) {
   return this.textBlockService.deleteTextBlock(id)
  }

  @Get()
  getTextBlockBYGroup(@Body() group: groupDto) {
    return this.textBlockService.getTextBlockByGroup(group)
  }
}
