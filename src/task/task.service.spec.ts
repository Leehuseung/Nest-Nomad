import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from "./task.service";
import { MoviesService } from "../movies/movies.service";

describe('TaskService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService,MoviesService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('mobile', () => {
    service.handleCron();
  });


});