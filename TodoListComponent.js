System.register(["./Model.js", "//code.jquery.com/jquery-1.12.1.min.js"], function (exports_1, context_1) {
    "use strict";
    var Model_js_1, TodoListComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Model_js_1_1) {
                Model_js_1 = Model_js_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            TodoListComponent = /** @class */ (function () {
                function TodoListComponent(element) {
                    this.element = element;
                    this.$el = $(element);
                }
                TodoListComponent.prototype.render = function (todos) {
                    this.$el.html("");
                    if (todos.length === 0) {
                        this.$el.html("\n        <div class='list-group-item text-center text-giant'>\n            <strong>You've completed everything you needed to do!</strong>\n        </div>\n        ");
                        return;
                    }
                    for (var index in todos) {
                        var todo = todos[index];
                        TodoListComponent.renderTodo(todo).appendTo(this.$el);
                    }
                };
                TodoListComponent.renderTodo = function (todo) {
                    return $("<div class='todo-item list-group-item " +
                        (todo.state == Model_js_1.TodoState.Complete && "completed") +
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
                        "</div>").on("click", function () {
                        var event = document.createEvent("CustomEvent");
                        event.initCustomEvent("todo-toggle", true, true, { todoId: todo.id });
                        this.dispatchEvent(event);
                    });
                };
                return TodoListComponent;
            }());
            exports_1("default", TodoListComponent);
        }
    };
});
