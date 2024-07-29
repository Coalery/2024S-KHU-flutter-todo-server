import { ApiProperty } from '@nestjs/swagger';

export class TodoResponse {
  @ApiProperty({ description: '투두 ID' })
  id: string;

  @ApiProperty({ description: '투두 내용' })
  content: string;

  @ApiProperty({ description: '투두 생성 일시' })
  createdAt: Date;

  @ApiProperty({ description: '투두 수정 일시' })
  updatedAt: Date;
}

export class ListTodoResponseDto extends Array<TodoResponse> {}

export class GetTodoResponseDto extends TodoResponse {}

export class CreateTodoResponseDto extends TodoResponse {}

export class UpdateTodoResponseDto extends TodoResponse {}
