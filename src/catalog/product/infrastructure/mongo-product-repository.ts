import { ProductRepository } from '../application/product-repository';
import { Product } from '../domain/product';
import { Collection, MongoClient } from 'mongodb';

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

export class MongoProductRepository implements ProductRepository {
  private readonly client: MongoClient;
  private productsCollection?: Collection<ProductDocument>;
  private presentationsCollection?: Collection<PresentationDocument>;

  constructor(uri: string, dbName: string) {
    this.client = new MongoClient(uri);
    const db = this.client.db(dbName);
    this.productsCollection = db.collection<ProductDocument>('products');
    this.presentationsCollection = db.collection<PresentationDocument>(
      'presentations'
    );
  }

  public async connect(): Promise<void> {
    await this.client.connect();
  }

  public async disconnect(): Promise<void> {
    await this.client.close();
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
