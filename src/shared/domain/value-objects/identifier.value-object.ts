import { StringValueObject } from './string-value-object';

export class IdentifierValueObject extends StringValueObject {
  private static readonly UUID_V4_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  constructor(value: string) {
    super(value);
    this.ensureValueIsUuid(value);
  }

  private ensureValueIsUuid(value: string): void {
    if (!IdentifierValueObject.UUID_V4_REGEX.test(value)) {
      throw new Error('Identifier must be a valid UUID v4');
    }
  }
}