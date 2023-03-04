import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // DTO에 없는 속성을 Client가 보내면 그값은 없이 DTO로 들어옴
    forbidNonWhitelisted: true, //DTO에 없는 속성을 Client가 보내면 Exception
    transform: true, //parameter가 항상 string으로 오지만 number로 받을 수 있게 한다.
  }));
  await app.listen(3000);
}
bootstrap();
//테스트 브랜치 1