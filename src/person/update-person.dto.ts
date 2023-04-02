import { DateOnlyDataType } from "sequelize";

export class updatePersonDto {
    readonly user_id: number;
    readonly  full_name: string;
    readonly phone: string;
    readonly date_of_birth: string;
}