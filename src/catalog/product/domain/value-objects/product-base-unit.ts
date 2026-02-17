import { EnumValueObject } from '../../../../shared/domain/value-objects/enum-value-object';

export class ProductBaseUnit extends EnumValueObject {
  private static readonly VALID_VALUES: string[] = ['UNIT', 'KILOGRAM', 'LITER'];

  constructor(value: string) {
    super(value, ProductBaseUnit.VALID_VALUES);
  }
}