import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createPersonDto } from './create-person.dto';
import { Person } from './person.model';
import { addRoleDto } from './add-role.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import sequelize from 'sequelize';
import { updatePersonDto } from './update-person.dto';

@Injectable()
export class PersonsService {
  constructor(@InjectModel(Person) private personRepository: typeof Person) {}

  async getAllPerson() {
    const persons = await this.personRepository.findAll();
    return persons;
  }

  async createPerson(dto: createPersonDto) {
    const person = await this.personRepository.create(dto);
    return person;
  }

  async getPersonById(user_id: number) {
    const person = await this.personRepository.findOne({
      where: { user_id: user_id },
      include: { all: true },
    });
    return person;
  }

  async addRole(dto: addRoleDto) {
    const person = await this.personRepository.findByPk(dto.user_id);
    const role = dto.role;

    if (person && role && !person.role.includes(role)) {
      await person.update({
        role: sequelize.fn('array_append', sequelize.col('role'), role),
      });
      return dto;
    }
    throw new HttpException(
      'Пользователь не найден или данная роль уже имеется',
      HttpStatus.NOT_FOUND
    );
  }

  async updatePerson(dto: updatePersonDto) {
    try {
      const person = await this.personRepository.findByPk(dto.user_id);
      await person.update({
        full_name: dto.full_name,
        phone: dto.phone,
        date_of_birth: dto.date_of_birth,
      });
      return person;
    } catch (err) {
      throw new HttpException('Некорректные данные', HttpStatus.BAD_REQUEST);
    }
  }

  async deletePerson(user_id: number) {
    const person = await this.personRepository.findByPk(user_id);
    if (!person) {
      return null;
    }
    await person.destroy();
    return person;
  }
}
