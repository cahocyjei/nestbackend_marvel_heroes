import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/dto/user.dto';
import { User } from './user.schema';
import { Public } from '../../config/config'


@Controller()
export class UserController {
  constructor(private userService: UserService) { }

  @Public()
  @Get('users/all')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Public()
  @Post('user/created')
  create(@Body() createUserDto: UserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get('userid/:id')
  findById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Delete('user/delete/:id')
  delete(@Param('id') id: any): Promise<string> {
    return this.userService.delete(id);
  }
  @Put('user/update/:id')
  update(@Body() userDto: UserDto, @Param('id') id): Promise<UserDto>{
    return this.userService.update(id, userDto);
  }

  @Get()
 async findByName(@Body('userName') userName: string):Promise<User>{
    return await this.userService.findOne(userName);
  }

}
