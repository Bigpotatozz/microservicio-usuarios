import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { jwt_strategy } from './auth.strategy';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
  ConfigModule.forRoot({isGlobal: true}),
  SequelizeModule.forFeature([Usuario]),
  JwtModule.register({
    secret: process.env.FIRM,
    signOptions: { expiresIn: '24h'}
  }), UsuarioModule],
  controllers: [AuthController],
  providers: [AuthService, jwt_strategy],
})
export class AuthModule {}
