import 'reflect-metadata';
import { randomUUID } from 'crypto';
import { SaveProduct } from './catalog/product/application/use-cases/save-product';
import { container } from './shared/infrastructure/dependency-container';
import { TYPES } from './shared/infrastructure/di/types';
import { MongoClientService } from './shared/infrastructure/mongo/mongo-client.service';

async function bootstrap(): Promise<void> {
  const saveProduct = container.get(SaveProduct);
  const mongoClientService = container.get<MongoClientService>(
    TYPES.MongoClientService
  );
  const productId = randomUUID();

  const data = {
    id: productId,
    name: 'Pan Integral 1kg',
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

  await mongoClientService.connect();
  try {
    await saveProduct.execute(data);
    console.log('Guardado correcto en products y presentations. ProductId:', productId);
  } finally {
    await mongoClientService.disconnect();
  }
}

bootstrap().catch((error) => console.error(error));
