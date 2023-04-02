import { Controller, Get, Post, Body, Put } from '@nestjs/common';
import { PersonsService } from './person.service';
import { createPersonDto } from './create-person.dto';
import { addRoleDto } from './add-role.dto';
import { ROLES } from 'src/auth/roles.auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UseGuards } from '@nestjs/common/decorators';
import { MyselfGuard } from 'src/auth/myself.guard';
import { updatePersonDto } from './update-person.dto';

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

    @ROLES('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role') 
    addRole(@Body() dto: addRoleDto ) {
        return this.PersonService.addRole(dto)
    }

    @ROLES('ADMIN')
    @UseGuards(MyselfGuard)
    @Put()
    updatePerson(@Body() dto: updatePersonDto) {
        return this.PersonService.updatePerson(dto)
    }
}
