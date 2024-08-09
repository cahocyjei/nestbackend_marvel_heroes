import { SetMetadata } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

let MONGODB_URI: string = process.env.MONGO_URI_DEV;
if (process.env.NODE_ENV == 'prod') {
  MONGODB_URI = process.env.MONGO_URI_PROD;
}
export default ()=>({
  database:{
    mongouri: MONGODB_URI,
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