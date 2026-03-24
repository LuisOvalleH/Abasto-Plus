import { inject, injectable } from 'inversify';
import {
  DomainEvent,
  DomainEventPayload,
} from '../../../../shared/domain/domain-event';
import { DomainEventSubscriber } from '../../../../shared/domain/domain-event-subscriber';
import { TranslateProduct } from '../use-cases/translate-product';

type ProductCreatedPayload = DomainEventPayload & {
  productId: string;
  name: string;
  baseUnit: string;
};

@injectable()
export class TranslateProductOnProductCreated
  implements DomainEventSubscriber
{
  constructor(
    private readonly translateProduct: TranslateProduct
  ) {}

  public subscribedTo(): string[] {
    return ['catalog.product_created'];
  }

  public async on(event: DomainEvent<DomainEventPayload>): Promise<void> {
    const payload = event.payload as ProductCreatedPayload;

    await this.translateProduct.execute({
      productId: payload.productId,
      name: payload.name,
      targetLanguage: 'en',
    });
  }
}
