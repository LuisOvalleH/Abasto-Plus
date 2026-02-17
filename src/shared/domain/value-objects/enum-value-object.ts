import { StringValueObject } from './string-value-object';

export class EnumValueObject<T extends string> extends StringValueObject {
  constructor(value: T, validValues: readonly T[]) {
    super(value);
    this.ensureValueIsValid(value, validValues);
  }

  private ensureValueIsValid(value: T, validValues: readonly T[]): void {
    if (!validValues.includes(value)) {
      throw new Error(`Invalid enum value: ${value}`);
    }
  }
}