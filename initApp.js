System.register(["./TodoApp.js"], function (exports_1, context_1) {
    "use strict";
    var TodoApp_js_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (TodoApp_js_1_1) {
                TodoApp_js_1 = TodoApp_js_1_1;
            }
        ],
        execute: function () {
            System.import("/TodoApp.js");
            new TodoApp_js_1.default(document.body, [
                "Complete task 1",
                "Complete task 2",
                "Complete task 3",
            ]);
        }
    };
});
