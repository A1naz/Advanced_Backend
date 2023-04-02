import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PersonsService } from 'src/person/person.service';
import { createUserDto } from 'src/users/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { createPersonDto } from 'src/person/create-person.dto';
import { User } from 'src/users/users.model';
import { Person } from 'src/person/person.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private personsService: PersonsService,
    private JwtService: JwtService
  ) {}

  async registration(userDto: createUserDto) {
    try {
      const candidate = await this.usersService.getUserByEmail(userDto.email);

      if (candidate) {
        throw new HttpException(
          'Пользователь с таким email уже существует',
          HttpStatus.BAD_REQUEST
        );
      }

      const hashPassword = await bcrypt.hash(userDto.password, 5);
      const user = await this.usersService.createUser({
        ...userDto,
        password: hashPassword,
      });
      const person = await this.personsService.createPerson({
        user_id: user.user_id,
      });
      return await this.generateToken(user, person);
    } catch (err) {
      console.log(err);
    }
  }

  async login(userDto: createUserDto) {
    const user = await this.validateUser(userDto);
    const person = await this.personsService.getPersonById(user.user_id);
    return await this.generateToken(user, person);
  }

  async generateToken(user: User, person: Person) {
    const payload = {
      user_id: user.user_id,
      email: user.email,
      password: user.password,
      role: person.role,
    };
    return {
      token: this.JwtService.sign(payload),
    };
  }

  private async validateUser(userDto: createUserDto) {
    try {
      const user = await this.usersService.getUserByEmail(userDto.email);

      const passwordEquals = await bcrypt.compare(
        userDto.password,
        user.password
      );

      if (user && passwordEquals) {
        return user;
      } else {
        throw new UnauthorizedException({
          message: 'Некорректный email или пароль',
        });
      }
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Некорректный email или пароль',
      });
    }
  }
}
