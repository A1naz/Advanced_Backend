import { Body, Controller, Get, Post } from '@nestjs/common';
import { createUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import { PersonsService } from 'src/person/person.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common/decorators';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() userDto: createUserDto) {
    return this.usersService.createUser(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers()
  }
}
