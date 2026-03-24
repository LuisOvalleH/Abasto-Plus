import { inject, injectable } from 'inversify';
import { ProductRepository } from '../product-repository';
import { ProductTranslationService } from '../product-translation-service';
import { TYPES } from '../../../../shared/infrastructure/di/types';

type TranslateProductCommand = {
  productId: string;
  name: string;
  targetLanguage: string;
};

@injectable()
export class TranslateProduct {
  constructor(
    @inject(TYPES.ProductRepository)
    private readonly repository: ProductRepository,
    @inject(TYPES.ProductTranslationService)
    private readonly translationService: ProductTranslationService
  ) {}

  public async execute(command: TranslateProductCommand): Promise<void> {
    const translatedName = await this.translationService.translate(
      command.name,
      command.targetLanguage
    );

    await this.repository.saveTranslation(
      command.productId,
      command.targetLanguage,
      translatedName
    );
  }
}
