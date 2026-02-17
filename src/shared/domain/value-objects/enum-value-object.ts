import { ValueObject } from './Value-object';

export class EnumValueObject extends ValueObject<string> {
  private readonly validValues: string[];

  constructor(value: string, validValues: string[]) {
    super(value);
    this.validValues = validValues;
    this.ensureValueIsValid(value);
  }

  private ensureValueIsValid(value: string): void {
    if (this.validValues.indexOf(value) === -1) {
      throw new Error(`Invalid enum value: ${value}`);
    }
  }
}