import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MoviesService } from "../movies/movies.service";

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor() { // providers에서 선언한 service를 di
  }

  @Cron('0/5 * * * * *')
  handleCron() {
    // this.moviesService.scheduleMovie();
    // this.logger.debug('Called when the current second is 45');
  }

  taskOne() {
    console.log('얍얍');
  }
}