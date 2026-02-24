import { Product } from '../domain/product';

export interface ProductRepository {
  save(data: Product): Promise<void>;
}
