import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { User } from '../users/user.schema';
import { SingInDto } from 'src/interfaces/login.interface';
import { UserI } from 'src/interfaces/user.interfaces';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService, private configService: ConfigService) { }

  async validateUser(name: string, document: string): Promise<any> {
    const verifPass = crypto.createHash('md5').update(document).digest('hex');
    try {
      const userFind: UserI = await this.userService.findOne( name );
    if (userFind && userFind.document === verifPass) {
      const user: SingInDto = {
        _id: userFind._id,
        name: userFind.name
      }
      return user;
    }
    } catch (error) {
      console.error(error);
    }
    return `User not Exist: ${ SingInDto }`;
  }

  async validateUserPayload(_id: string):Promise<User>{
    return await this.userService.findById(_id);
  }

 async login(user: SingInDto){
    const payload = { userName: user.name, sub: user._id };
    console.log('Payload: ', payload)
    return { access_token: this.jwtService.sign(payload)};
  }
}