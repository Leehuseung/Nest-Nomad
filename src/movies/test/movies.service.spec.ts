import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from '../movies.service';
import { NotFoundException } from "@nestjs/common";
import { TasksService } from "../../task/task.service";


const mockTasksService = {
  taskOne: jest.fn(() => {
    console.log('fn');
    console.log('fn');
    console.log('fn');
  }),
}

describe('MoviesService', () => {
  let service: MoviesService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [MoviesService, TasksService],
    }).overrideProvider(TasksService).useValue(mockTasksService).compile();

    service = module.get<MoviesService>(MoviesService);
    jest.clearAllMocks()
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return array',() => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title:'Test Movie',
        genres: ['test'],
        year: 2000
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('should throw 404 error', () => {
      try{
        service.getOne(999);
      }catch (e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found.');
      }
    })
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title:'Test Movie',
        genres: ['test'],
        year: 2000
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      }catch (e){
        expect(e).toBeInstanceOf(NotFoundException);
      };
    })
  });

  describe('create', () => {
    it('should create a movie', () =>{
      const beforeCreate = service.getAll().length;
      service.create({
        title:'Test Movie',
        genres: ['test'],
        year: 2000
      })
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    })
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title:'Test Movie',
        genres: ['test'],
        year: 2000
      });
      service.update(1, {
        title:'Update Test'
      });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Update Test');
    })
    it('it should throw a NotFoundException', () => {
      try {
        service.update(999,{});
      }catch (e){
        expect(e).toBeInstanceOf(NotFoundException);
      };
    })
  })

  it('의존성 테스트', () => {
    service.dependencyTest();
  });

});