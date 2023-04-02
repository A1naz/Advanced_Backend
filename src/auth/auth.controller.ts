import { Body, Controller, Delete, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { createUserDto } from 'src/users/create-user.dto';
import { AuthService } from './auth.service';
import { ROLES } from './roles.auth.decorator';
import { MyselfGuard } from './myself.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  login(@Body() userDto: createUserDto) {
    return this.authService.login(userDto);
  }

  @UsePipes(ValidationPipe)
  @Post('/registration')
  registration(@Body() userDto: createUserDto) {
    return this.authService.registration(userDto);
  }

  @ROLES('ADMIN')
  @UseGuards(MyselfGuard)
  @Delete('/delete/:id')
  deleteUser(@Param('id')  id: string) {
    return this.authService.deleteUser(id) 
    
  }
     

}
