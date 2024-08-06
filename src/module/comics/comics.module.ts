import { Module } from '@nestjs/common';
import { ComicsService } from './comics.service';
import { ComicsController } from './comics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ListComic, ListComicSchema  } from './schemaListcomic';


@Module({
  imports: [MongooseModule.forFeature([{ name: ListComic.name, schema: ListComicSchema }])], 
  providers: [ComicsService ],
  controllers: [ComicsController],
  exports: [ComicsService]
})
export class ComicsModule {}
