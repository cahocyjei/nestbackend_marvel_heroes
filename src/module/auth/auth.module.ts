import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../strategys/local.strategy';
import { JwtStrategy } from '../../strategys/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>({
        secret: configService.get<string>('api.jwtsecret'),
        signOptions: { expiresIn: '1h' }
      }),
      inject:[ConfigService]
    }),
  ],
  providers: [
     AuthService,
     LocalStrategy, JwtStrategy
    ],
  exports: [ AuthService ]
})
export class AuthModule {}
