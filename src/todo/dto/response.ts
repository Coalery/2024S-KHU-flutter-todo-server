export type TodoResponse = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ListTodoResponseDto = TodoResponse[];

export type GetTodoResponseDto = TodoResponse;

export type CreateTodoResponseDto = TodoResponse;

export type UpdateTodoResponseDto = TodoResponse;
