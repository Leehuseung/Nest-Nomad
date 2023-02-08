import { Module } from "@nestjs/common";
import { MoviesController } from "./movies.controller";
import { MoviesService } from "./movies.service";
import { TaskModule } from "../task/task.module";

@Module({
  imports: [TaskModule],
  controllers:[MoviesController],
  providers:[MoviesService],  //providers는 DI를 할수 있게 해준다
})
export class MoviesModule {}
