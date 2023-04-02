import { Column, DataType, Model, Table } from "sequelize-typescript";

interface TBCreationAttributes {
    title: string;
    content: string;
    image: string;
    group: string;
}

@Table({tableName: 'text_block'})
export class TextBlock extends Model<TextBlock, TBCreationAttributes> {

    @Column( {type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true} )
    id: number;

    @Column( {type: DataType.STRING, unique: true, allowNull: false} )
    title: string;

    @Column( {type: DataType.STRING, allowNull: true} )
    content: string;

    @Column( {type: DataType.STRING, allowNull: true} )
    image: string;

    @Column( {type: DataType.STRING, allowNull: true} )
    group: string;
}