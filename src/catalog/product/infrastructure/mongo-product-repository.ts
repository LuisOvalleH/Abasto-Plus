import { ProductRepository } from '../application/product-repository';
import { Product } from '../domain/product';
import { Collection } from 'mongodb';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../shared/infrastructure/di/types';
import { MongoClientService } from '../../../shared/infrastructure/mongo/mongo-client.service';

type ProductDocument = {
  _id: string;
  name: string;
  baseUnit: string;
};

type PresentationDocument = {
  _id: string;
  productId: string;
  name: string;
  type: string;
  netQuantity: number;
  unitOfMeasure: string;
};

@injectable()
export class MongoProductRepository implements ProductRepository {
  private productsCollection?: Collection<ProductDocument>;
  private presentationsCollection?: Collection<PresentationDocument>;

  constructor(
    @inject(TYPES.MongoClientService)
    private readonly mongoClientService: MongoClientService
  ) {
    const db = this.mongoClientService.getDb();
    this.productsCollection = db.collection<ProductDocument>('products');
    this.presentationsCollection = db.collection<PresentationDocument>(
      'presentations'
    );
  }

  public async save(data: Product): Promise<void> {
    const product = data.toPrimitives();
    const products = this.productsCollection;
    const presentations = this.presentationsCollection;

    if (!products || !presentations) {
      throw new Error('Repositorio no inicializado');
    }

    await products.insertOne({
      _id: product.id,
      name: product.name,
      baseUnit: product.baseUnit,
    });

    if (product.presentations.length > 0) {
      await presentations.insertMany(
        product.presentations.map((presentation) => ({
          _id: presentation.id,
          productId: product.id,
          name: presentation.name,
          type: presentation.type,
          netQuantity: presentation.netQuantity,
          unitOfMeasure: presentation.unitOfMeasure,
        }))
      );
    }
  }
}
