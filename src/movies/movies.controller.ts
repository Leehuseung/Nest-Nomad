import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  //:id로 인식되기 때문에 search를 위로 올린다.
  @Get('search')
  search(@Query('year') searchingYear :string){
    return `We are searching for a movie made after: ${searchingYear}`
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return `This will return one movie with the id: ${id}`;
  }

  @Post()
  create(@Body() movieData){
    console.log(movieData);
    return movieData;
  }

  @Delete(':id')
  remove(@Param('id') movieId:string){
    return `This will delete a movie with the id: ${movieId}`;
  }

  @Patch(':id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return {
      updatedMovie : movieId,
      ...updateData
    };
  }



}
