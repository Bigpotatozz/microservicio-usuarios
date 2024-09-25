import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {

    @IsString()
    nombre: string;
    @IsEmail()
    email: string;
    @IsString()
    contrasenia: string;
    @IsString()
    rol: string;
    
}
