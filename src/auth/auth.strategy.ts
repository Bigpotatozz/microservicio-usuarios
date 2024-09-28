import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

//LOS STRATEGY SON COMO LOS MIDDLEWARES DE EXPRESS, SU FUNCION ES TOMAR ESTRATEGIAS EN BASE AL TIPO DE TOKEN QUE SE ESTE USANDO
@Injectable()
export class jwt_strategy extends PassportStrategy(Strategy, 'jwt_strategy'){

    constructor(){
        super({
            //EXTRAE EL TOKEN DESDE EL ENCABEZADO
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            //SE LE ESPECIFICA LA FIRMA PARA VALIDAR LOS TOKENS ENTRANTES
            secretOrKey: process.env.FIRM
        })
    }

    //ES UNA FUNCION QUE TE DEVUELVE EL PAYLOAD PARA PODER USARLOS POR EJEMPLO EN LOS CONTROLLERS
    async validate(payload: any){
        return  {correo: payload.correo, id: payload.id};
    }
};