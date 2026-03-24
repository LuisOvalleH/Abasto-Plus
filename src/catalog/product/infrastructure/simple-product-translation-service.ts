import { injectable } from 'inversify';
import { ProductTranslationService } from '../application/product-translation-service';

@injectable()
export class SimpleProductTranslationService
  implements ProductTranslationService
{
  public async translate(
    text: string,
    targetLanguage: string
  ): Promise<string> {
    return `${text} (${targetLanguage.toUpperCase()})`;
  }
}
