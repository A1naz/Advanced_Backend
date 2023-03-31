import { Controller } from '@nestjs/common';
import { usersService } from './users.service';
import { Get } from '@nestjs/common/decorators';

@Controller('/api')
export class UsersController {
  constructor(private usersService: usersService) {}

  @Get('/users')
  getUsers() {
    return this.usersService.getUsers();
  }
}
