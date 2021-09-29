interface Todo {
  id: number;
  name: string;
  state: TodoState;
}

enum TodoState {
  Active = 1,
  Complete = 2,
}

class TodoService {
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
