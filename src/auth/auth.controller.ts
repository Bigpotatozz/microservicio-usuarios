import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('/login')
  async login(@Body() datos: loginDto){

    try{

      return this.authService.login(datos);

    }catch(error){
      console.log(error);
      return error;
  }


}

}