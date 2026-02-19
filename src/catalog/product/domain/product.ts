import { ProductBaseUnit } from './value-objects/product-base-unit';
import { ProductId } from './value-objects/product-id';
import { ProductName } from './value-objects/product-name';
import { ProductPresentations } from './value-objects/product-presentations';
import { PresentationPrimitives } from './entities/presentation';

export class Product {
  private readonly productId: ProductId;
  private readonly productName: ProductName;
  private readonly productBaseUnit: ProductBaseUnit;
  private readonly productPresentations: ProductPresentations;

  private constructor(
    productId: ProductId,
    productName: ProductName,
    productBaseUnit: ProductBaseUnit,
    productPresentations: ProductPresentations
  ) {
    this.productId = productId;
    this.productName = productName;
    this.productBaseUnit = productBaseUnit;
    this.productPresentations = productPresentations;
  }

  public static build(
    id: string,
    name: string,
    baseUnit: string,
    presentations: PresentationPrimitives[]
  ): Product {
    return new Product(
      new ProductId(id),
      new ProductName(name),
      new ProductBaseUnit(baseUnit),
      new ProductPresentations(presentations)
    );
  }
}
