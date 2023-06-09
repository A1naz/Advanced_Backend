import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttributes {
    email: string;
    password: string;
}

@Table({tableName: 'users', createdAt: false, updatedAt: false})
export class User extends Model<User, UserCreationAttributes> {

    @Column( {type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true} )
    user_id: number;

    @Column( {type: DataType.STRING, unique: true, allowNull: false} )
    email: string;

    @Column( {type: DataType.STRING, allowNull: false} )
    password: string;
}