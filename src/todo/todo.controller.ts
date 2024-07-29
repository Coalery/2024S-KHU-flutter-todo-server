import { Controller, Get } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Post, Put, Delete, Body, Param } from '@nestjs/common';
import {
  CreateTodoResponseDto,
  GetTodoResponseDto,
  ListTodoResponseDto,
  UpdateTodoResponseDto,
} from './dto/response';
import { Owner } from '../owner.decorator';
import { CreateTodoRequestDto, UpdateTodoRequestDto } from './dto/request';
import {
  ApiBasicAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@Controller()
@ApiBasicAuth()
export class AppController {
  constructor(private readonly todoService: TodoService) {}

  @ApiOperation({ summary: '투두 목록 조회' })
  @ApiResponse({ status: 200, type: ListTodoResponseDto })
  @Get('/todos')
  async listTodo(@Owner() owner: string): Promise<ListTodoResponseDto> {
    const todoEntities = await this.todoService.listTodo(owner);

    return todoEntities.map((entity) => ({
      id: entity.id,
      content: entity.content,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }));
  }

  @ApiOperation({ summary: '투두 조회' })
  @ApiParam({ name: 'todoId', description: '조회할 투두 ID' })
  @ApiResponse({ status: 200, type: GetTodoResponseDto })
  @Get('/todos/:todoId')
  async getTodoById(
    @Owner() owner: string,
    @Param('todoId') todoId: string,
  ): Promise<GetTodoResponseDto> {
    const todoEntity = await this.todoService.getTodo(owner, todoId);

    return {
      id: todoEntity.id,
      content: todoEntity.content,
      createdAt: todoEntity.createdAt,
      updatedAt: todoEntity.updatedAt,
    };
  }

  @ApiOperation({ summary: '투두 생성' })
  @ApiResponse({ status: 201, type: CreateTodoResponseDto })
  @Post('/todos')
  async createTodo(
    @Owner() owner: string,
    @Body() dto: CreateTodoRequestDto,
  ): Promise<CreateTodoResponseDto> {
    const { content } = dto;
    const todoEntity = await this.todoService.createTodo(owner, content);

    return {
      id: todoEntity.id,
      content: todoEntity.content,
      createdAt: todoEntity.createdAt,
      updatedAt: todoEntity.updatedAt,
    };
  }

  @ApiOperation({ summary: '투두 수정' })
  @ApiParam({ name: 'todoId', description: '수정할 투두 ID' })
  @ApiResponse({ status: 200, type: UpdateTodoResponseDto })
  @Put('/todos/:todoId')
  async updateTodo(
    @Owner() owner: string,
    @Param('todoId') todoId: string,
    @Body() dto: UpdateTodoRequestDto,
  ): Promise<UpdateTodoResponseDto> {
    const { content } = dto;
    const todoEntity = await this.todoService.updateTodo(
      owner,
      todoId,
      content,
    );

    return {
      id: todoEntity.id,
      content: todoEntity.content,
      createdAt: todoEntity.createdAt,
      updatedAt: todoEntity.updatedAt,
    };
  }

  @ApiOperation({ summary: '투두 삭제' })
  @ApiParam({ name: 'todoId', description: '삭제할 투두 ID' })
  @Delete('/todos/:todoId')
  async deleteTodo(
    @Owner() owner: string,
    @Param('todoId') todoId: string,
  ): Promise<void> {
    await this.todoService.deleteTodo(owner, todoId);
  }
}
