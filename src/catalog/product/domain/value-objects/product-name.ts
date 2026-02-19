import { StringValueObject } from '../../../../shared/domain/value-objects/string-value-object';

export class ProductName extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureNameLengthIsValid(value);
  }

  private ensureNameLengthIsValid(value: string): void {
    if (value.trim().length <= 10) {
      throw new Error('El nombre del producto no supera los 10 caracteres');
    }
  }
}