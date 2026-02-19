import { IntValueObject } from '../../../../../shared/domain/value-objects/int-value-object';

export class PresentationNetQuantity extends IntValueObject {
  constructor(value: number) {
    super(value);
    this.ensureValueIsGreaterThanZero(value);
  }

  private ensureValueIsGreaterThanZero(value: number): void {
    if (value <= 0) {
      throw new Error('Presentation net quantity must be greater than zero');
    }
  }
}
