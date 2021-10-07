var TodoService = /** @class */ (function () {
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
            state: TodoState.Active,
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
        this.todos = this.todos.filter(function (todo) { return todo.state === TodoState.Active; });
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
            case TodoState.Active:
                todo.state = TodoState.Complete;
                break;
            case TodoState.Complete:
                todo.state = TodoState.Active;
                break;
        }
    };
    TodoService.prototype._find = function (todoId) {
        return this.todos.filter(function (todo) { return todo.id === todoId; })[0];
    };
    TodoService._lastId = 0;
    return TodoService;
}());
