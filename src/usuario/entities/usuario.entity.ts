import { DataTypes } from "sequelize";
import { Table, Model, Column } from "sequelize-typescript";

@Table({
    tableName: "usuario",
    timestamps: false
})
export class Usuario extends Model {

    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    })
    id_usuario: number;

    @Column({
        type: DataTypes.STRING(100),
        allowNull: false
    })
    nombre: string;

    @Column({
        type: DataTypes.STRING(100),
        allowNull: false
    })
    contrasenia: string;

    @Column({
        type: DataTypes.STRING(100),
        allowNull: false
    })
    email: string;

    @Column({
        type: DataTypes.STRING(45),
        allowNull: false
    })
    rol: string;

    @Column({
        type: DataTypes.BOOLEAN,
        defaultValue: true
    })
    estatus: boolean;


}
