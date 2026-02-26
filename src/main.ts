import { SaveProduct } from './catalog/product/application/use-cases/save-product';
import { MongoProductRepository } from './catalog/product/infrastructure/mongo-product-repository';
import { randomUUID } from 'crypto';

async function bootstrap(): Promise<void> {
  const mongoProductRepository = new MongoProductRepository(
    'mongodb://localhost:27017',
    'abasto_plus'
  );
  const saveProduct = new SaveProduct(mongoProductRepository);
  const productId = randomUUID();

  const data = {
    id: productId,
    name: 'Tortilla Integral 1kg',
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

  await mongoProductRepository.connect();
  try {
    await saveProduct.execute(data);
    console.log('Guardado correcto en products y presentations. ProductId:', productId);
  } finally {
    await mongoProductRepository.disconnect();
  }
}

bootstrap().catch((error) => console.error(error));
