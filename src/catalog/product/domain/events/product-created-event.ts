import {
  DomainEvent,
  DomainEventPayload,
} from '../../../../shared/domain/domain-event';

type ProductCreatedEventPayload = DomainEventPayload & {
  productId: string;
  name: string;
  baseUnit: string;
};

export class ProductCreatedEvent extends DomainEvent<ProductCreatedEventPayload> {
  constructor(payload: ProductCreatedEventPayload) {
    super('catalog.product_created', payload);
  }
}
