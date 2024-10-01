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

  async findOne(id: number) {
    
    try{
      
      const user = await this.usuario.findByPk(id);
      return user;

    }catch(error){
      console.log(error);
      return {message: 'Error al obtener el usuario'};
    }
    
  }

  async findStudents() {
    try{

      const students = await this.usuario.findAll({where: {rol: 'estudiante'}});
      if(!students){
        return {message: 'No hay estudiantes registrados'};
      }

      return students;

    }catch(error){
      console.log(error);
      return error;
    }
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    
    try{

      const user = await this.usuario.findByPk(id);
      await user.update(updateUsuarioDto);

      return {message: 'Usuario modificado correctamente'};

    }catch(error){
      console.log(error);
      return {message: 'Error al modificar el usuario'};
    }
  }

  async remove(id: number) {
    try{

      const user = await this.usuario.findByPk(id);
      await user.update({estatus: false});
      return {message: 'Usuario eliminado correctamente'};
      

    }catch(error){
      console.log(error);
      return {message: 'Error al eliminar el usuario'};
    }
  }
}
