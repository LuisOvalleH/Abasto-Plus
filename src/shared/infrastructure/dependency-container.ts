import { Container } from 'inversify';
import { SaveProduct } from '../../catalog/product/application/use-cases/save-product';
import { ProductRepository } from '../../catalog/product/application/product-repository';
import { MongoProductRepository } from '../../catalog/product/infrastructure/mongo-product-repository';
import { TYPES } from './di/types';
import { MongoClientService } from './mongo/mongo-client.service';

const mongoUri = process.env.MONGO_URI ?? 'mongodb://localhost:27017';
const mongoDbName = process.env.MONGO_DB_NAME ?? 'abasto_plus';

export const container = new Container();

container.bind<string>(TYPES.MongoUri).toConstantValue(mongoUri);
container.bind<string>(TYPES.MongoDbName).toConstantValue(mongoDbName);
container
  .bind<MongoClientService>(TYPES.MongoClientService)
  .to(MongoClientService)
  .inSingletonScope();
container
  .bind<ProductRepository>(TYPES.ProductRepository)
  .to(MongoProductRepository)
  .inSingletonScope();
container.bind<SaveProduct>(SaveProduct).toSelf();
