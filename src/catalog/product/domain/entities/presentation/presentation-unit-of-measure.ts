import { EnumValueObject } from '../../../../../shared/domain/value-objects/enum-value-object';

export class PresentationUnitOfMeasure extends EnumValueObject {
  private static readonly VALID_VALUES: string[] = [
    'UNIT',
    'GRAM',
    'KILOGRAM',
    'MILLILITER',
    'LITER',
  ];

  constructor(value: string) {
    super(value, PresentationUnitOfMeasure.VALID_VALUES);
  }
}
