import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Observable } from 'rxjs';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class correoGuard implements CanActivate {

  constructor( @InjectModel(Usuario) private usuario: typeof Usuario) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    
    const request = context.switchToHttp().getRequest();
    const {email} = request.body;
    
    const valido = await this.usuario.findOne({where: {email: email}});

    if(valido){
      return false;
    }

    return true;
  }
}