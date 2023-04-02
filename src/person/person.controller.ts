import { Controller, Get, Post, Body } from '@nestjs/common';
import { PersonsService } from './person.service';
import { createPersonDto } from './create-person.dto';

@Controller('persons')
export class PersonController {
    constructor(private PersonService: PersonsService) {}

    @Get()
    getAllPerson() {
        return this.PersonService.getAllPerson();
    }

    @Post()
    createPerson(@Body() personDto: createPersonDto) {
       return this.PersonService.createPerson(personDto)
    }
}
