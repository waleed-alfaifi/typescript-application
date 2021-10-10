import { Todo, TodoState } from "./Model.js";
import "//code.jquery.com/jquery-1.12.1.min.js";

export interface ITodoListComponent {
  render(todos: Todo[]): void;
}

class TodoListComponent implements ITodoListComponent {
  private $el: JQuery;
  constructor(private element: Element) {
    this.$el = $(element);
  }

  render(todos: Todo[]) {
    this.$el.html("");

    if (todos.length === 0) {
      this.$el.html(
        `
        <div class='list-group-item text-center text-giant'>
            <strong>You've completed everything you needed to do!</strong>
        </div>
        `
      );

      return;
    }

    for (const index in todos) {
      const todo = todos[index];
      TodoListComponent.renderTodo(todo).appendTo(this.$el);
    }
  }

  static renderTodo(todo: Todo) {
    return $(
      "<div class='todo-item list-group-item " +
        (todo.state == TodoState.Complete && "completed") +
        "'>" +
        "   <div class='row'>" +
        "       <div class='col-md-2 text-center'>" +
        "           <i class='incomplete glyphicon glyphicon-unchecked text-muted text-giant'></i>" +
        "           <i class='completed-indicator completed glyphicon glyphicon-ok text-giant'></i>" +
        "       </div>" +
        "       <div class='col-md-10'>" +
        "            <span class='incomplete text-giant'>" +
        todo.name +
        "</span>" +
        "            <span class='completed text-strikethrough text-muted text-giant'>" +
        todo.name +
        "</span>" +
        "        </div>" +
        "    </div>" +
        "    <div class='clearfix'></div>" +
        "</div>"
    ).on("click", function () {
      const event = document.createEvent("CustomEvent");
      event.initCustomEvent("todo-toggle", true, true, { todoId: todo.id });
      this.dispatchEvent(event);
    });
  }
}

export default TodoListComponent;
