import { Injectable } from '@nestjs/common';
import { User } from '../users/user.schema';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from 'src/dto/user.dto';
import * as crypto from 'crypto';
import { SingInDto } from 'src/interfaces/login.interface';
import { use } from 'passport';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel:Model<User>){}

  async create( user: UserDto ):Promise<User>{
    const newUser = {
      ...user,
      document: crypto.createHash('md5').update(user.document).digest('hex')
      
    }
    const createdUser = new this.userModel(newUser);
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findById(id: string):Promise<User>{
    return await this.userModel.findById( id );
  }

  async findOne(userName: string): Promise<any>{
    const user = await this.userModel.findOne({ name: userName }).exec();
    return user;
  }

  async delete(id: string): Promise<string> {
    return await this.userModel.findByIdAndDelete(id);
  }
  async update(id: string, user: UserDto): Promise<UserDto> {
    if(user.document){
      user = {
        ...user,
        document:crypto.createHash('md5').update(user.document).digest('hex')
      }
    }
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }
}
