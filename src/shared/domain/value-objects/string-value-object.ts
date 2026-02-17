import { ValueObject } from './Value-object';

export class StringValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }
}