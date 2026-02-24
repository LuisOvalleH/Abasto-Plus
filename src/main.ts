import { ProductRepository } from './catalog/product/application/product-repository';
import { Product } from './catalog/product/domain/product';
import { MongoProductRepository } from './catalog/product/infrastructure/mongo-product-repository';
import { randomUUID } from 'crypto';

async function bootstrap(): Promise<void> {
  const mongoProductRepository = new MongoProductRepository(
    'mongodb://localhost:27017',
    'abasto_plus'
  );
  const repository: ProductRepository = mongoProductRepository;
  const productId = randomUUID();

  const product = Product.build(
    productId,
    'Arroz Integral 1kg',
    'KILOGRAM',
    [
      {
        id: randomUUID(),
        name: 'Bolsa 1kg',
        type: 'UNIT',
        netQuantity: 1,
        unitOfMeasure: 'KILOGRAM',
      },
    ]
  );

  await mongoProductRepository.connect();
  try {
    await repository.save(product);
    console.log('Guardado correcto en products y presentations. ProductId:', productId);
  } finally {
    await mongoProductRepository.disconnect();
  }
}

bootstrap().catch((error) => console.error(error));
