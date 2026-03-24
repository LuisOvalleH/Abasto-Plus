import { inject, injectable } from 'inversify';
import { Product, ProductPrimitives } from '../../domain/product';
import { ProductCreatedEvent } from '../../domain/events/product-created-event';
import { ProductRepository } from '../product-repository';
import { EventBus } from '../../../../shared/domain/event-bus';
import { TYPES } from '../../../../shared/infrastructure/di/types';

@injectable()
export class SaveProduct {
  constructor(
    @inject(TYPES.EventBus)
    private readonly eventBus: EventBus,
    @inject(TYPES.ProductRepository)
    private readonly repository: ProductRepository
  ) {}

  public async execute(data: ProductPrimitives): Promise<void> {
    const product = Product.build(
      data.id,
      data.name,
      data.baseUnit,
      data.presentations
    );

    await this.repository.save(product);
    await this.eventBus.publish([
      new ProductCreatedEvent({
        productId: data.id,
        name: data.name,
        baseUnit: data.baseUnit,
      }),
    ]);
  }
}
