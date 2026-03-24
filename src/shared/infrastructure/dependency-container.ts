import { Container } from 'inversify';
import { ProductTranslationService } from '../../catalog/product/application/product-translation-service';
import { TranslateProductOnProductCreated } from '../../catalog/product/application/subscribers/translate-product-on-product-created';
import { TranslateProduct } from '../../catalog/product/application/use-cases/translate-product';
import { SaveProduct } from '../../catalog/product/application/use-cases/save-product';
import { OpenAiProductTranslationService } from '../../catalog/product/infrastructure/openai-product-translation-service';
import { ProductRepository } from '../../catalog/product/application/product-repository';
import { MongoProductRepository } from '../../catalog/product/infrastructure/mongo-product-repository';
import { EventBus } from '../domain/event-bus';
import { TYPES } from './di/types';
import { InMemoryEventBus } from './event-bus/in-memory-event-bus';
import { MongoClientService } from './mongo/mongo-client.service';

const mongoUri = process.env.MONGO_URI ?? 'mongodb://localhost:27017';
const mongoDbName = process.env.MONGO_DB_NAME ?? 'abasto_plus';
const openAiApiKey = process.env.OPENAI_API_KEY ?? '';
const openAiTranslationModel = process.env.OPENAI_TRANSLATION_MODEL ?? 'gpt-5.2';

export const container = new Container();

container.bind<InMemoryEventBus>(InMemoryEventBus).toSelf().inSingletonScope();
container.bind<EventBus>(TYPES.EventBus).toService(InMemoryEventBus);
container.bind<string>(TYPES.MongoUri).toConstantValue(mongoUri);
container.bind<string>(TYPES.MongoDbName).toConstantValue(mongoDbName);
container.bind<string>(TYPES.OpenAiApiKey).toConstantValue(openAiApiKey);
container
  .bind<string>(TYPES.OpenAiTranslationModel)
  .toConstantValue(openAiTranslationModel);
container
  .bind<MongoClientService>(TYPES.MongoClientService)
  .to(MongoClientService)
  .inSingletonScope();
container
  .bind<ProductRepository>(TYPES.ProductRepository)
  .to(MongoProductRepository)
  .inSingletonScope();
container
  .bind<ProductTranslationService>(TYPES.ProductTranslationService)
  .to(OpenAiProductTranslationService)
  .inSingletonScope();
container
  .bind<TranslateProductOnProductCreated>(TranslateProductOnProductCreated)
  .toSelf();
container.bind<TranslateProduct>(TranslateProduct).toSelf();
container.bind<SaveProduct>(SaveProduct).toSelf();
