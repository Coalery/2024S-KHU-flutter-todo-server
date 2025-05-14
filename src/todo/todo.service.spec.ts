import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { TodoService } from './todo.service';
import { TodoEntity } from '../todo.entity';
import { ExceptionMessage } from '../exception';

describe('TodoService', () => {
  let todoService: TodoService;
  let todoRepository: jest.Mocked<Repository<TodoEntity>>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(TodoEntity),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
        { provide: DataSource, useValue: {} },
      ],
    }).compile();

    todoService = module.get<TodoService>(TodoService);
    todoRepository = module.get(getRepositoryToken(TodoEntity));
  });

  describe('getTodo', () => {
    test('주어진 ID에 대한 TODO 데이터가 존재하지 않으면 예외를 발생시켜야 한다', async () => {
      const owner = 'testOwner';
      const todoId = 'nonExistentId';

      todoRepository.findOneBy.mockResolvedValue(null);

      await expect(todoService.getTodo(owner, todoId)).rejects.toThrow(
        ExceptionMessage.TODO_NOT_FOUND,
      );
    });

    test('TODO 데이터가 존재하면 해당 데이터를 반환해야 한다', async () => {
      const owner = 'testOwner';
      const todoId = 'existingId';
      const todoData: TodoEntity = {
        id: todoId,
        owner,
        content: 'Test Todo',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      todoRepository.findOneBy.mockResolvedValue(todoData);

      const result = await todoService.getTodo(owner, todoId);

      expect(result).toEqual(todoData);
    });
  });
});
