import { Module } from "@nestjs/common";
import { MoviesService } from "../movies/movies.service";
import { TasksService } from "./task.service";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [ScheduleModule.forRoot()],
  providers:[MoviesService, TasksService],
})
export class TaskModule {}
