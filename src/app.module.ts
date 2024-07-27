import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './todo/todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todo.entity';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { OwnerGuard } from './owner.guard';
import { TodoService } from './todo/todo.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data.db',
      entities: [TodoEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([TodoEntity]),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: OwnerGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    TodoService,
  ],
})
export class AppModule {}
