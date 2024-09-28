import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class loginDto{

    @IsEmail()
    @IsNotEmpty()
    correo: string;

    @IsString()
    contrasenia: string;

}