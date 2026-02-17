import { EnumValueObject } from './shared/domain/value-objects/enum-value-object';
import { IdentifierValueObject } from './shared/domain/value-objects/identifier.value-object';
import { IntValueObject } from './shared/domain/value-objects/int-value-object';

const productId = new IdentifierValueObject('123e4567-e89b-42d3-a456-426614174000');
const stock = new IntValueObject(10);
const status = new EnumValueObject<'ACTIVE' | 'INACTIVE'>('ACTIVE', ['ACTIVE', 'INACTIVE']);

console.log(productId.toString(), stock.valueOf(), status.toString());