import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from '../todo.entity';
import { DataSource, Repository } from 'typeorm';
import { ExceptionMessage } from '../exception';
import { ulid } from 'ulid';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
    private readonly dataSource: DataSource,
  ) {}

  // 원래는 페이지네이션이 구현되어야 하나, 간단하게 구현하기 위해 생략함.
  async listTodo(owner: string): Promise<TodoEntity[]> {
    return await this.todoRepository.find({
      where: { owner },
      order: { updatedAt: 'DESC' },
    });
  }

  async getTodo(owner: string, todoId: string): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOneBy({ owner, id: todoId });

    if (!todo) {
      throw new NotFoundException(ExceptionMessage.TODO_NOT_FOUND);
    }

    return todo;
  }

  async createTodo(owner: string, content: string): Promise<TodoEntity> {
    return this.dataSource.transaction(async (manager) => {
      const repo = manager.getRepository(TodoEntity);

      const todo = repo.create({
        id: ulid(),
        owner,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return await repo.save(todo);
    });
  }

  async updateTodo(
    owner: string,
    todoId: string,
    content: string,
  ): Promise<TodoEntity> {
    return this.dataSource.transaction(async (manager) => {
      const repo = manager.getRepository(TodoEntity);

      const todo = await repo.findOneBy({ owner, id: todoId });

      if (!todo) {
        throw new NotFoundException(ExceptionMessage.TODO_NOT_FOUND);
      }

      todo.content = content;
      todo.updatedAt = new Date();

      return await repo.save(todo);
    });
  }

  async deleteTodo(owner: string, todoId: string): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const repo = manager.getRepository(TodoEntity);

      const todo = await repo.findOneBy({ owner, id: todoId });

      if (!todo) {
        throw new NotFoundException(ExceptionMessage.TODO_NOT_FOUND);
      }

      await repo.remove(todo);
    });
  }
}
