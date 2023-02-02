import { Module } from "@nestjs/common";
import { MoviesModule } from "./movies/movies.module";
import { AppController } from './app.controller';
import { TaskModule } from './task/task.module';

@Module({
  imports: [MoviesModule, TaskModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
