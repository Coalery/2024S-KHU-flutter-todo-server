import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateTodoRequestDto {
  @ApiProperty({ description: '생성할 투두의 내용' })
  @IsString()
  @Length(1, 300)
  content: string;
}

export class UpdateTodoRequestDto {
  @ApiProperty({ description: '수정할 투두의 내용' })
  @IsString()
  @Length(1, 300)
  content: string;
}
