System.register(["./Model.js"], function (exports_1, context_1) {
    "use strict";
    var Model_js_1, TodoService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Model_js_1_1) {
                Model_js_1 = Model_js_1_1;
            }
        ],
        execute: function () {
            TodoService = /** @class */ (function () {
                function TodoService(todos) {
                    var _this = this;
                    this.todos = [];
                    if (todos) {
                        todos.forEach(function (todo) {
                            _this.add(todo);
                        });
                    }
                }
                TodoService.generateTodoId = function () {
                    return (this._lastId += 1);
                };
                TodoService.clone = function (src) {
                    return JSON.parse(JSON.stringify(src));
                };
                TodoService.prototype.add = function (input) {
                    var todo = {
                        id: TodoService.generateTodoId(),
                        name: null,
                        state: Model_js_1.TodoState.Active,
                    };
                    if (typeof input === "string") {
                        todo.name = input;
                    }
                    else if (typeof input.name === "string") {
                        todo.name = input.name;
                    }
                    else {
                        throw new Error("Invalid Todo name!");
                    }
                    this.todos.push(todo);
                    return todo;
                };
                TodoService.prototype.clearCompleted = function () {
                    this.todos = this.todos.filter(function (todo) { return todo.state === Model_js_1.TodoState.Active; });
                };
                TodoService.prototype.getAll = function () {
                    return TodoService.clone(this.todos);
                };
                TodoService.prototype.getById = function (todoId) {
                    return this._find(todoId);
                };
                TodoService.prototype.toggle = function (todoId) {
                    var todo = this._find(todoId);
                    if (!todo)
                        return;
                    switch (todo.state) {
                        case Model_js_1.TodoState.Active:
                            todo.state = Model_js_1.TodoState.Complete;
                            break;
                        case Model_js_1.TodoState.Complete:
                            todo.state = Model_js_1.TodoState.Active;
                            break;
                    }
                };
                TodoService.prototype._find = function (todoId) {
                    return this.todos.filter(function (todo) { return todo.id === todoId; })[0];
                };
                TodoService._lastId = 0;
                return TodoService;
            }());
            exports_1("default", TodoService);
        }
    };
});
