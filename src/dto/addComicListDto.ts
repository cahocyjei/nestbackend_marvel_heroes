import { ComicDto } from "./comic.dto";

export interface AddComicListDto{
  idUser: string,
  nameList: string,
  idComic: string,
  name: string,
  description: string,
  image: string 
}