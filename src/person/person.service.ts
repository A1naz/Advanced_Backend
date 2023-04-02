import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createPersonDto } from './create-person.dto';
import { Person } from './person.model';

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
    const person = await this.personRepository.findOne({where: {user_id: user_id}, include: {all: true} })
    return person;
  }
}
