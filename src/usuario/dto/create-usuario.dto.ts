import { IsEmail, IsString } from "class-validator";

export class CreateUsuarioDto {


    @IsString()
    nombre: string;

    @IsString()
    contrasenia: string;

    @IsEmail()
    email: string;

    @IsString()
    rol: string;


}
