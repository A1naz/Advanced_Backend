import { Injectable } from '@nestjs/common';

@Injectable()
export class usersService {
  async getUsers() {
    return [{ id: 1, name: 'Ainaz' }];
  }
}
