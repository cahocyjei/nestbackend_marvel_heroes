import { SetMetadata } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

export default ()=>({
  database:{
    mongouri: process.env.MONGO_URI  as string,
  }, 
  api:{
    jwtsecret: process.env.JWT_SECRET as string,
    port: parseInt(process.env.PORT),
    publickey: process.env.PUBLICKEY_MARVEL as string,
    privatekey: process.env.PRIVATEKEY_MARVEL as string,
    urlmarvel: process.env.URL_MARVEL as string,
    environment: process.env.NODE_ENV,
  },
  dominio:{
    frontend: process.env.FRONT_END as string,
  },
  
});

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);