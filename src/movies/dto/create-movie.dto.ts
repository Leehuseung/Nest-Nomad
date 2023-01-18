import { IS_NUMBER, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMovieDto {
  @IsString()
  @IsOptional()
  readonly title: string;

  @IsNumber()
  @IsOptional()
  readonly year: number;

  @IsOptional()
  @IsString({ each:true})
  readonly genres: string[];
}