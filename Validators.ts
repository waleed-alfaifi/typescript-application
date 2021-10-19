import { Todo, TodoState } from "./Model";

export class ValidatableTodo implements Todo {
  id: number;
  name: string;
  state: TodoState;

  constructor(id: number) {
    //
  }
}

export interface IValidatable {
  validate(): IValidationResult;
}

export interface IValidationResult {
  isValid: boolean;
  message: string;
  property?: string;
}

export interface IValidator {
  (instance: Object): IValidationResult;
}

export function validate() {
  const validators: IValidator[] = [].concat(this._validators);
  const errors: IValidationResult[] = [];

  for (const validator of validators) {
    const result = validator(this);

    if (!result.isValid) {
      errors.push(result);
    }
  }

  return errors;
}
