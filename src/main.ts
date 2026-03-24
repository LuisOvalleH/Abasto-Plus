import 'reflect-metadata';
import { randomUUID } from 'crypto';
import { SaveProduct } from './catalog/product/application/use-cases/save-product';
import { TranslateProductOnProductCreated } from './catalog/product/application/subscribers/translate-product-on-product-created';
import { container } from './shared/infrastructure/dependency-container';
import { TYPES } from './shared/infrastructure/di/types';
import { InMemoryEventBus } from './shared/infrastructure/event-bus/in-memory-event-bus';
import { MongoClientService } from './shared/infrastructure/mongo/mongo-client.service';

async function bootstrap(): Promise<void> {
  const eventBus = container.get(InMemoryEventBus);
  const translateProductOnProductCreated = container.get(
    TranslateProductOnProductCreated
  );
  const saveProduct = container.get(SaveProduct);
  const mongoClientService = container.get<MongoClientService>(
    TYPES.MongoClientService
  );
  const productId = randomUUID();

  const data = {
    id: productId,
    name: 'bread integral 1kg',
    baseUnit: 'KILOGRAM',
    presentations: [
      {
        id: randomUUID(),
        name: 'Bolsa 1kg',
        type: 'UNIT',
        netQuantity: 1,
        unitOfMeasure: 'KILOGRAM',
      },
    ],
  };

  eventBus.addSubscribers([translateProductOnProductCreated]);

  await mongoClientService.connect();
  try {
    await saveProduct.execute(data);
    await eventBus.dispatchConsumedEvents('catalog.', 10);
    console.log('Guardado correcto en products y presentations. ProductId:', productId);
  } finally {
    await mongoClientService.disconnect();
  }
}

bootstrap().catch((error) => console.error(error));
