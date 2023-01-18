import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, Res } from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { Movie } from "./entities/movie.entity";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";

@Controller('movies')
export class MoviesController {

  constructor(private readonly moviesService: MoviesService) { // providers에서 선언한 service를 di
  }

  @Get() //@Req,@Res가 존재하면 Jest E2E test에서 행걸림(timeout)
  getAll() :Movie[]{  //express를 기반으로 하기 때문에 req와 res에 접근할 수 있다. 직접 사용하는건 좋은 방법은 아니다.
    // res.json()  //express. 프레임워크를 바꾸고 싶으면?
    return this.moviesService.getAll();
  }

  //:id로 인식되기 때문에 search를 위로 올린다.
  @Get('search')
  search(@Query('year') searchingYear :string){
    return `We are searching for a movie made after: ${searchingYear}`
  }

  @Get(':id')
  getOne(@Param('id') movieId: number) :Movie{
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto){
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  remove(@Param('id') movieId:number){
    return this.moviesService.deleteOne(movieId);
  }

  @Patch(':id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(movieId,updateData);
  }



}
