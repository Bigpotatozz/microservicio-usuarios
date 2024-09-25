import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('/crearUsuario')
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    
    try{

      return await this.usuarioService.create(createUsuarioDto); 

    }catch(error){
      console.log(error);
      return error;
    }

  }

  @Get('/obtenerUsuarios')
  async findAll() {

    try{
      return await this.usuarioService.findAll();
    }catch(error){
      console.log(error);
      return error;
    }

  }

  @Put('/cambiarContrasenia/:id')
  async cambiarContrasenia(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    try{

      return await this.usuarioService.cambiarContrasenia(+id, updateUsuarioDto);
    }catch(error){
      console.log(error);
      return error;
    }

  }


  @Get('/obtenerUsuario/:id')
  async findOne(@Param('id') id: string) {

    try{
      return await this.usuarioService.findOne(+id);
    }catch(error){ 
      console.log(error);
      return error;
    }
    
  }

  @Put('/modificarUsuario/:id')
  async update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    try{
      return await this.usuarioService.update(+id, updateUsuarioDto);
    }catch(error){ 
      console.log(error);
      return error;
    }
  }

  @Delete('/eliminarUsuario/:id')
  async remove(@Param('id') id: string) {
    try{
      return await this.usuarioService.remove(+id);
    }catch(error){ 
      console.log(error);
      return error;
    }
  }
}
