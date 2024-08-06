import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { User } from '../users/user.schema';
import { UserDto } from 'src/dto/user.dto';
import { JwtPayload } from 'jsonwebtoken';
import { SingInDto } from 'src/interfaces/login.interface';
import { ObjectId } from 'mongoose';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

  async validateUser(name: string, document: string): Promise<SingInDto> {
    const verifPass = crypto.createHash('md5').update(document).digest('hex');
    const userFind = await this.userService.findOne(name);
    if (userFind && userFind.document === verifPass) {
      const user: SingInDto = {
        _id: userFind._id,
        name: userFind.name
      }
      return user;
    }
    return null;
  }

  async validateUserPayload(_id: string):Promise<User>{
    return await this.userService.findById(_id);
  }

 async login(user: any){
    const payload = { userName: user.name, sub: user._id };
    return { access_token: this.jwtService.sign(payload)};
  }
}