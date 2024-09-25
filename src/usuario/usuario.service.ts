import { Injectable } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {

  constructor(@InjectModel(Usuario) private usuario: typeof Usuario){}


  async create(createUsuarioDto: CreateUsuarioDto) {
  
    try{

      let {nombre, contrasenia, email, rol} = createUsuarioDto;
      let salt = await bcryptjs.genSaltSync(10)
      let password = await bcryptjs.hashSync(contrasenia, salt);

      let user = await this.usuario.create({nombre: nombre, contrasenia: password, email: email, rol: rol});

      return {message: 'Usuario creado correctamente'};

    }catch(error){
      console.log(error);
      return {message: 'Error al crear el usuario'};
    }


  }

  async findAll() {
    
    try{

      const users = await this.usuario.findAll();

      const users_cleaned = users.map(user => {
        return {nombre: user.nombre, email: user.email, rol: user.rol, estatus: user.estatus};
      });

      return users_cleaned;

    }catch(error){
      console.log(error);
      return {message: 'Error al obtener los usuarios'};
    }

  }

  async cambiarContrasenia(id: number, updateUsuarioDto: UpdateUsuarioDto) {

    try{

      let salt = await bcryptjs.genSaltSync(10);
      let password = await bcryptjs.hashSync(updateUsuarioDto.contrasenia, salt);

      const user = await this.usuario.findByPk(id);
      await user.update({contrasenia: password});

      return {message: 'Contraseña cambiada correctamente'};

      
    }catch(error){
      console.log(error);
      return {message: 'Error al cambiar la contraseña'};
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
