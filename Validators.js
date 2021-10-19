System.register([], function (exports_1, context_1) {
    "use strict";
    var ValidatableTodo;
    var __moduleName = context_1 && context_1.id;
    function validate() {
        var validators = [].concat(this._validators);
        var errors = [];
        for (var _i = 0, validators_1 = validators; _i < validators_1.length; _i++) {
            var validator = validators_1[_i];
            var result = validator(this);
            if (!result.isValid) {
                errors.push(result);
            }
        }
        return errors;
    }
    exports_1("validate", validate);
    return {
        setters: [],
        execute: function () {
            ValidatableTodo = /** @class */ (function () {
                function ValidatableTodo(id) {
                    //
                }
                return ValidatableTodo;
            }());
            exports_1("ValidatableTodo", ValidatableTodo);
        }
    };
});
//# sourceMappingURL=Validators.js.map