import { DateOnlyDataType } from 'sequelize';
import {  BelongsTo, Column, DataType, Default, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/users.model';

interface PersonCreationAttributes {
  person_id: number;
  full_name: string;
  date_of_birth: DateOnlyDataType;
  phone: string;
  role: string[];
}

@Table({ tableName: 'persons', createdAt: false, updatedAt: false })
export class Person extends Model<Person, PersonCreationAttributes> {

  @ForeignKey(()=> User)
  @Column({ type: DataType.INTEGER, allowNull: false, unique: true, primaryKey: true})
  user_id: Number;

  @BelongsTo(() => User, 'user_id')
  person_id: User;

  @Column({ type: DataType.STRING, allowNull: true })
  full_name: string;

  @Column({ type: DataType.STRING, allowNull: true })
  phone: string;

  @Column({ type: DataType.DATEONLY, allowNull: true })
  date_of_birth: string;

  @Default(['USER'])
  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  role: string[];

}
