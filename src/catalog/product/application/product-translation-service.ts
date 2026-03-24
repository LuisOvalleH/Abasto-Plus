export interface ProductTranslationService {
  translate(text: string, targetLanguage: string): Promise<string>;
}
