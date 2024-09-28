import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { jwt_strategy } from "./auth.strategy";

@Injectable()
export class jwtAuthGuard extends AuthGuard('jwt_strategy') {

}