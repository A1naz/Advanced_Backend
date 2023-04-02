import { Injectable,  HttpException, HttpStatus} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createUserDto } from './create-user.dto';
import { User } from './users.model';



@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: createUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async deleteUser(user_id: number) {
      const user = await this.userRepository.findByPk(user_id);
      if (!user) {
       throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
      }
      await user.destroy();
      return user;
  }
}
