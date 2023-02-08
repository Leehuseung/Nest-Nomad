import { Injectable, NotFoundException } from "@nestjs/common";
import { Movie } from "./entities/movie.entity";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { TasksService } from "../task/task.service";

@Injectable()
export class MoviesService {
  private movies:Movie[] = [];

  constructor(private readonly taskService: TasksService) { // providers에서 선언한 service를 di
  }

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id:number): Movie {
    const movie = this.movies.find(movie => movie.id === id);
    if(!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return movie;
  }

  deleteOne(id: number){
    this.getOne(id);
    this.movies = this.movies.filter(movie => movie.id !== id);
    return true;
  }

  create(movieData: CreateMovieDto){
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id:number, updateData: UpdateMovieDto){
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({...movie, ...updateData});
  }

  scheduleMovie(){
    console.log('saersar');
  }

  dependencyTest(){
    this.taskService.taskOne();
  }
}
