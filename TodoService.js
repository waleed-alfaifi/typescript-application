System.register(["./Model.js"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var Model_js_1, TodoService;
    var __moduleName = context_1 && context_1.id;
    // Create a reusable decorator with TypeScript
    function log(target, methodName, descriptor) {
        var originalMethod = descriptor.value;
        var logItForMePlease = function (methodName, body, withReturn) {
            if (withReturn) {
                console.log(methodName + "(" + JSON.stringify(body) + ") => " + JSON.stringify(withReturn, null, 4));
            }
            else {
                console.log(methodName + "(" + JSON.stringify(body) + ")");
            }
        };
        // Out new method (i.e. decorator) that calls the original method but also adds some functionality to it
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            logItForMePlease(methodName, args);
            var returnValue = originalMethod.apply(this, args);
            logItForMePlease(methodName, args, returnValue);
            return returnValue;
        };
    }
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
                    var x;
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
                __decorate([
                    log
                ], TodoService.prototype, "add", null);
                return TodoService;
            }());
            exports_1("default", TodoService);
        }
    };
});
//# sourceMappingURL=TodoService.js.map