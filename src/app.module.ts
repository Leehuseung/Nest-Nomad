import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { CatsController } from "./cats.controller";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [CatsController, AppController],
  providers: [],
})
export class AppModule {}
