import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../module/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'name', passwordField: 'document' });
  }

  async validate(name: string, document: string): Promise<any> {
    const user = await this.authService.validateUser(name, document);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}