import { Body, Controller, Get, Param, Post, Req, Request, Res } from '@nestjs/common';
import { ComicsService } from './comics.service';
import { Public } from '../../config/config';
import { AddComicListDto } from '../../dto/addComicListDto';
import { ComicDto } from 'src/dto/comic.dto';

@Controller('comics')
export class ComicsController {
  constructor(private readonly comicsService: ComicsService) { }
  @Public()
  @Get('/marvel')
  async getComicsMarvel() {
    return await this.comicsService.getComicsMarvel();
  }

  @Post('addList/:id')
  async addListComicUser(@Req() req: any, @Param('id') id: string, @Body('nameList') nameList: string) {
    const idUser: string = req.user.id;
    try {
      //Validate Comics in mongo database, not duplicate.
      if (!await this.comicsService.findOneComic(id)) {
        //if does'nt in the mongodb database, verify that it exist in the local database
        const comic: ComicDto = this.comicsService.comicsTempStore().find(comic => comic.idComic == id);
        if (!comic) {
          return 'Comic not found';
        }
        const listComicSave: AddComicListDto = { 
          idUser, 
          nameList, 
          idComic: comic.idComic,
          name: comic.name,
          description: comic.description,
          image: comic.image, 
        }

        await this.comicsService.addListComicUser(listComicSave);
        return `Added Comic: ${JSON.stringify(listComicSave)}`
      };
      return 'Duplicate comic';
    } catch (error) {
      console.error(error)
    }
  }
  @Get('comic/:id')
  async findComicId(@Param('id') id: string) {
    try {
      return await this.comicsService.findComicId(id);
    } catch (error) {
      console.log(error);
    }
  }
  @Public()
  @Get('mongodb')
  async getListComicsUser(@Request() req: any) {
    try {
      return await this.comicsService.getListComicsUser(req.user.id);
    } catch (error) {
      console.error(error);
    }
  }
}
