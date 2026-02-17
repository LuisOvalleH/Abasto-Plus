import { ValueObject } from './Value-object';

export class StringValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureValueIsDefined(value);
  }

  private ensureValueIsDefined(value: string): void {
    if (value == null || value.trim().length === 0) {
      throw new Error('Value must be a non-empty string');
    }
  }
}