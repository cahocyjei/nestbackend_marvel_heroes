import { Controller, Post, UseGuards, Get, Res, HttpStatus, HttpCode, Request, Body } from '@nestjs/common';
import { AuthService } from './module/auth/auth.service';
import { Response } from 'express';
import { LocalAuthGuard } from './strategys/local-auth.guard';
import { Public } from '././config/config';
import { UserService } from './module/users/user.service';

@Controller('auth')
export class AppController {
  constructor(private authService: AuthService, private userService: UserService) { }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Request() req: any, @Body('name') name: string) {
    return await this.authService.login(req.user);
  }

  
  @Get('logout')
  logout(@Res() res: Response, @Request() req: any) {
    res.clearCookie('Token', { path: '/' });
    res.send('Sesion Cerrada');
  }
  
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
