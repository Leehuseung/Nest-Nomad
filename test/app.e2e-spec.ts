import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication, ValidationPipe } from "@nestjs/common";

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    //이렇게 요청하면 실제 서버와 다르게 1이 string타입으로 컨트롤러에 전달된다.
    //main.ts에서 {transform: true}라는 옵션을 사용했다.
    //main 함수와 다르게 app을 app = moduleFixture.createNestApplication(); 이렇게 생성하고있음. 해당 생성부분을 똑같이 넣어주자.
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcom to My Movie API');
  });

  describe('/movies',() => {
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([]);
    });
    it( 'POST',() => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title:'Test Movie',
          genres: ['test'],
          year: 2000
        })
        .expect(201);
    })
    it('DELETE',() => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    })
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/999').expect(404);
    });
    it.todo('DELETE');
    it.todo('PATCH');
  });


});
