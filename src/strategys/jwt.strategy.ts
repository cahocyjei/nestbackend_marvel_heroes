import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../module/auth/auth.service";;
import { JwtPayload } from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('api.jwtsecret'),
    });
  }
  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUserPayload(payload.sub);
    return user;
  }
}