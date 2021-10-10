System.register([], function (exports_1, context_1) {
    "use strict";
    var TodoState;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            (function (TodoState) {
                TodoState[TodoState["Active"] = 1] = "Active";
                TodoState[TodoState["Complete"] = 2] = "Complete";
            })(TodoState || (TodoState = {}));
            exports_1("TodoState", TodoState);
        }
    };
});
