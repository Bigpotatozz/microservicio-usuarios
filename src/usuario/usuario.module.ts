import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usuario } from './entities/usuario.entity';

@Module({
  imports: [SequelizeModule.forFeature([Usuario])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
