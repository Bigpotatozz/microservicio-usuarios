import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { loginDto } from './dto/login';

@Injectable()
export class AuthService {

    constructor(@InjectModel(Usuario) private usuario: typeof Usuario, private jwtService: JwtService){}

    async login(login: loginDto){

        try{

            const {correo, contrasenia} = login;
            const usuario = await this.usuario.findOne({where: {email: correo}});

            if(!usuario){
                return {message: 'Usuario no encontrado'};
            }

            const passwordMatch = bcrypt.compareSync(contrasenia, usuario.contrasenia);

            if(!passwordMatch){
                return {message: 'Contraseña incorrecta'};
            }

            const payload = {correo: usuario.email, rol: usuario.rol};
            const token = this.jwtService.sign(payload);

            return {usuario: usuario,
                    token: token
            };

        }catch(error){
            console.log(error);
            return {message: 'Error en el servidor'};
        }



    }


}
