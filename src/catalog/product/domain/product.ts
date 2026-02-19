import { ProductBaseUnit } from './value-objects/product-base-unit';
import { ProductId } from './value-objects/product-id';
import { ProductName } from './value-objects/product-name';
import { Presentation } from './entities/presentation';

export type ProductPresentationBuildInput = {
  id: string;
  name: string;
  type: string;
  netQuantity: number;
  unitOfMeasure: string;
};

export class Product {
  private readonly productId: ProductId;
  private readonly productName: ProductName;
  private readonly productBaseUnit: ProductBaseUnit;
  private readonly productPresentations: Presentation[];

  private constructor(
    productId: ProductId,
    productName: ProductName,
    productBaseUnit: ProductBaseUnit,
    productPresentations: Presentation[]
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
    presentations: ProductPresentationBuildInput[]
  ): Product {
    return new Product(
      new ProductId(id),
      new ProductName(name),
      new ProductBaseUnit(baseUnit),
      presentations.map((presentation) =>
        Presentation.build(
          presentation.id,
          presentation.name,
          presentation.type,
          presentation.netQuantity,
          presentation.unitOfMeasure
        )
      )
    );
  }
}
