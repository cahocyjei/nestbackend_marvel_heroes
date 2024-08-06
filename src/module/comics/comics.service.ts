import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { ListComic } from './schemaListcomic';
import { Model } from 'mongoose';
import { ComicDto } from 'src/dto/comic.dto';
import { AddComicListDto } from '../../dto/addComicListDto';


@Injectable()
export class ComicsService {
findComics: ComicDto[] = []; 
  constructor(private configService: ConfigService, 
    @InjectModel(ListComic.name) 
    private readonly listComicModel:Model<ListComic>,
  ){};
  // Claves y parámetros
  ts = Date.now().toString();  // Obtiene la marca de tiempo actual
  // Construir la cadena a hashear
  stringToHash = this.ts + this.configService.get<string>('api.privatekey') + this.configService.get<string>('api.publickey');
  // Calcular el hash MD5
  hash = crypto.createHash('md5').update(this.stringToHash).digest('hex');
  // Mostrar la URL con los parámetros
  url = `${this.configService.get<string>('api.urlmarvel')}?ts=${this.ts}&apikey=${this.configService.get<string>('api.publickey')}&hash=${this.hash}`;
  async getComicsMarvel():Promise<ComicDto[]> {
    const response = await fetch(this.url);
    const data = await response.json();
    let comic: ComicDto;
    try {
      for (let i = 0; i < 10; i++) {
        comic = {
          idComic: data.data.results[i].id,
          name: data.data.results[i].name,
          description: data.data.results[i].description,
          image: `${data.data.results[i].thumbnail.path}.${data.data.results[i].thumbnail.extension}`
        }
        this.findComics[i] = comic;
      }
    } catch (error) {
      console.error(error)
    }
    this.findComics?console.log('Add store Dates'):console.log('Not add store dates');
    return this.findComics;
  }
  comicsTempStore(){
    return this.findComics;
  }

  async addListComicUser(addComicListDto: AddComicListDto){
    const addListComic = new  this.listComicModel(addComicListDto);
    await addListComic.save();
  }

  async findComicId(id: string): Promise<ComicDto>{
    return await this.listComicModel.findById(id);
  }

  async findOneComic(id: string):Promise<boolean>{
    if(await this.listComicModel.countDocuments() > 0 && await this.listComicModel.findOne({ idComic: id }).exec()){
      return true;
    }
    return false;
  }

  async getListComicsUser(idUser: string): Promise<AddComicListDto[]>{
    return ((await this.listComicModel.find()).filter(comic => comic.idUser === idUser));
  }
}