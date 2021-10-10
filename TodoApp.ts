import TodoService, { ITodoService } from "./TodoService.js";
import TodoListComponent, { ITodoListComponent } from "./TodoListComponent.js";

class TodoApp {
  todoService: ITodoService;
  todoList: ITodoListComponent;

  constructor(el: HTMLElement, todos: string[]) {
    this.todoService = new TodoService(todos);
    this.initialize(el);
  }

  addTodo(todoName: string) {
    this.todoService.add(todoName);
    this.renderTodos();
  }

  clearCompleted() {
    this.todoService.clearCompleted();
    this.renderTodos();
  }

  renderTodos() {
    const todos = this.todoService.getAll();
    this.todoList.render(todos);
  }

  initialize(element: HTMLElement) {
    const addTodoFormEl = element.getElementsByClassName("add-todo")[0];
    const addTodoNameEl = addTodoFormEl.getElementsByTagName("input")[0];
    const todoListEl = element.getElementsByClassName("todo-list")[0];
    const clearCompletedEl =
      element.getElementsByClassName("clear-completed")[0];

    addTodoFormEl.addEventListener("submit", (event) => {
      this.addTodo(addTodoNameEl.value);
      addTodoNameEl.value = "";
      event.preventDefault();
    });

    todoListEl.addEventListener("todo-toggle", (event: CustomEvent<any>) => {
      const todoId = event.detail.todoId;
      this.todoService.toggle(todoId);
      this.renderTodos();
    });

    clearCompletedEl.addEventListener("click", () => {
      this.clearCompleted();
    });

    this.todoList = new TodoListComponent(todoListEl);
    this.renderTodos();
  }
}

export default TodoApp;
