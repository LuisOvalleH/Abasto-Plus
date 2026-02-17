import { ValueObject } from './Value-object';

export class IntValueObject extends ValueObject<number> {
  constructor(value: number) {
    super(value);
    this.ensureValueIsInt(value);
  }

  private ensureValueIsInt(value: number): void {
    if (value % 1 !== 0) {
      throw new Error('Value must be an integer');
    }
  }
}