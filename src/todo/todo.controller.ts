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

@Controller()
export class AppController {
  constructor(private readonly todoService: TodoService) {}

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

  @Delete('/todos/:todoId')
  async deleteTodo(
    @Owner() owner: string,
    @Param('todoId') todoId: string,
  ): Promise<void> {
    await this.todoService.deleteTodo(owner, todoId);
  }
}
