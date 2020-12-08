import {Entity, model, property} from '@loopback/repository';

@model()
export class TodoListImage extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  value: string;

  @property({
    type: 'number',
    required: true,
  })
  todoListid: number;


  constructor(data?: Partial<TodoListImage>) {
    super(data);
  }
}

export interface TodoListImageRelations {
  // describe navigational properties here
}

export type TodoListImageWithRelations = TodoListImage & TodoListImageRelations;
