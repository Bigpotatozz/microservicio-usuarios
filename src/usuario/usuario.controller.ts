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


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
