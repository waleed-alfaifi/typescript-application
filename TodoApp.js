System.register(["./TodoService.js", "./TodoListComponent.js"], function (exports_1, context_1) {
    "use strict";
    var TodoService_js_1, TodoListComponent_js_1, TodoApp;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (TodoService_js_1_1) {
                TodoService_js_1 = TodoService_js_1_1;
            },
            function (TodoListComponent_js_1_1) {
                TodoListComponent_js_1 = TodoListComponent_js_1_1;
            }
        ],
        execute: function () {
            TodoApp = /** @class */ (function () {
                function TodoApp(el, todos) {
                    this.todoService = new TodoService_js_1.default(todos);
                    this.initialize(el);
                }
                TodoApp.prototype.addTodo = function (todoName) {
                    this.todoService.add(todoName);
                    this.renderTodos();
                };
                TodoApp.prototype.clearCompleted = function () {
                    this.todoService.clearCompleted();
                    this.renderTodos();
                };
                TodoApp.prototype.renderTodos = function () {
                    var todos = this.todoService.getAll();
                    this.todoList.render(todos);
                };
                TodoApp.prototype.initialize = function (element) {
                    var _this = this;
                    var addTodoFormEl = element.getElementsByClassName("add-todo")[0];
                    var addTodoNameEl = addTodoFormEl.getElementsByTagName("input")[0];
                    var todoListEl = element.getElementsByClassName("todo-list")[0];
                    var clearCompletedEl = element.getElementsByClassName("clear-completed")[0];
                    addTodoFormEl.addEventListener("submit", function (event) {
                        _this.addTodo(addTodoNameEl.value);
                        addTodoNameEl.value = "";
                        event.preventDefault();
                    });
                    todoListEl.addEventListener("todo-toggle", function (event) {
                        var todoId = event.detail.todoId;
                        _this.todoService.toggle(todoId);
                        _this.renderTodos();
                    });
                    clearCompletedEl.addEventListener("click", function () {
                        _this.clearCompleted();
                    });
                    this.todoList = new TodoListComponent_js_1.default(todoListEl);
                    this.renderTodos();
                };
                return TodoApp;
            }());
            exports_1("default", TodoApp);
        }
    };
});
