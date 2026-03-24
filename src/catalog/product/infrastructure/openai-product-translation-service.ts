import { inject, injectable } from 'inversify';
import OpenAI from 'openai';
import { ProductTranslationService } from '../application/product-translation-service';
import { TYPES } from '../../../shared/infrastructure/di/types';

@injectable()
export class OpenAiProductTranslationService
  implements ProductTranslationService
{
  private readonly client: OpenAI;

  constructor(
    @inject(TYPES.OpenAiApiKey) apiKey: string,
    @inject(TYPES.OpenAiTranslationModel) private readonly model: string
  ) {
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY no esta configurada');
    }

    this.client = new OpenAI({ apiKey });
  }

  public async translate(
    text: string,
    targetLanguage: string
  ): Promise<string> {
    const response = await this.client.responses.create({
      model: this.model,
      instructions:
        'You are a product translation service. Translate product names accurately. Return only the translated text with no explanation.',
      input: `Translate this product name to ${targetLanguage}: ${text}`,
    });

    const translatedText = response.output_text.trim();

    if (!translatedText) {
      throw new Error('OpenAI no devolvio una traduccion');
    }

    return translatedText;
  }
}
