import { EnumValueObject } from '../../../../../shared/domain/value-objects/enum-value-object';

export class PresentationType extends EnumValueObject {
  private static readonly VALID_VALUES: string[] = ['UNIT', 'PACK', 'BOX', 'BOTTLE'];

  constructor(value: string) {
    super(value, PresentationType.VALID_VALUES);
  }
}
