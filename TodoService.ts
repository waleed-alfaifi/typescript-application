import { Todo, TodoState } from "./Model.js";

// Remember, interfaces are like the public face for other modules; so they should only include public members
export interface ITodoService {
  add(todo: Todo): Todo;
  add(todo: string): Todo;
  clearCompleted(): void;
  getAll(): Todo[];
  getById(todoId: number): Todo;
  toggle(todoId: number): void;
}

class TodoService implements ITodoService {
  private static _lastId = 0;
  private todos: Todo[] = [];

  constructor(todos: string[]) {
    if (todos) {
      todos.forEach((todo) => {
        this.add(todo);
      });
    }
  }

  private static generateTodoId(): number {
    return (this._lastId += 1);
  }

  private static clone<T>(src: T): T {
    return JSON.parse(JSON.stringify(src));
  }

  // Accepts a todo name or todo object
  add(input: Todo): Todo;
  add(input: string): Todo;
  add<T extends Todo | string>(input: T): Todo {
    const todo: Todo = {
      id: TodoService.generateTodoId(),
      name: null,
      state: TodoState.Active,
    };

    if (typeof input === "string") {
      todo.name = input;
    } else if (typeof input.name === "string") {
      todo.name = input.name;
    } else {
      throw new Error("Invalid Todo name!");
    }

    this.todos.push(todo);
    return todo;
  }

  clearCompleted(): void {
    this.todos = this.todos.filter((todo) => todo.state === TodoState.Active);
  }

  getAll(): Todo[] {
    return TodoService.clone(this.todos);
  }

  getById(todoId: number): Todo {
    return this._find(todoId);
  }

  toggle(todoId: number): void {
    const todo = this._find(todoId);
    if (!todo) return;

    switch (todo.state) {
      case TodoState.Active:
        todo.state = TodoState.Complete;
        break;
      case TodoState.Complete:
        todo.state = TodoState.Active;
        break;
    }
  }

  private _find(todoId: number): Todo {
    return this.todos.filter((todo) => todo.id === todoId)[0];
  }
}

// Create a decorator with pure JavaScript
const originalMethod = TodoService.prototype.add;

TodoService.prototype.add = function (...args: any) {
  console.log(`add(${JSON.stringify(args)})`);
  const returnValue = originalMethod.apply(this, args);
  console.log(
    `add(${JSON.stringify(args)}) => ${JSON.stringify(returnValue, null, 4)}`
  );
  return returnValue;
};

export default TodoService;
