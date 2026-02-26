import { Product, ProductPrimitives } from '../../domain/product';
import { ProductRepository } from '../product-repository';

export class SaveProduct {
  constructor(private readonly repository: ProductRepository) {}

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
