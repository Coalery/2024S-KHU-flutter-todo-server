import { IsString, Length } from 'class-validator';

export class CreateTodoRequestDto {
  @IsString()
  @Length(1, 300)
  content: string;
}

export class UpdateTodoRequestDto {
  @IsString()
  @Length(1, 300)
  content: string;
}
