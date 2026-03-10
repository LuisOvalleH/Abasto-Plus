import { inject, injectable } from 'inversify';
import { Product, ProductPrimitives } from '../../domain/product';
import { ProductRepository } from '../product-repository';
import { TYPES } from '../../../../shared/infrastructure/di/types';

@injectable()
export class SaveProduct {
  constructor(
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
  }
}
