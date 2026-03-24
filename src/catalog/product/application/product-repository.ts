import { Product } from '../domain/product';

export interface ProductRepository {
  save(data: Product): Promise<void>;
  saveTranslation(
    productId: string,
    language: string,
    translatedName: string
  ): Promise<void>;
}
