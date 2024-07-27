import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity('Todo')
export class TodoEntity {
  @PrimaryColumn('varchar', { length: 100 })
  id: string;

  @Column('varchar', { length: 310 })
  content: string;

  @Column('varchar', { length: 110 })
  @Index('idx_todo_owner')
  owner: string;

  @Column('datetime')
  createdAt: Date;

  @Column('datetime')
  updatedAt: Date;
}
