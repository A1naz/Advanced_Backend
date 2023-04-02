import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    try {
      const fileName = uuid.v4() + '.png';
      const filePath = path.resolve(__dirname, '..', 'static');
      console.log(filePath);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      console.log('filename: ', fileName);
      return fileName;
    } catch (error) {
      throw new HttpException(
        'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deleteFIle(name: string) {
    try {
      const filePath = path.resolve(__dirname, '..', 'static');
      fs.unlinkSync(filePath + '/' + name);
    } catch (err) {}
  }
}
