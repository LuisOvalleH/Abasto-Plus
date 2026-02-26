import { Presentation, PresentationPrimitives } from '../entities/presentation';
import { ValueObject } from '../../../../shared/domain/value-objects/Value-object';

export class ProductPresentations extends ValueObject<Presentation[]> {
  private static readonly MAX_PRESENTATIONS = 5;

  constructor(presentations: Array<PresentationPrimitives>) {
    super(
      presentations.map((presentation) =>
        Presentation.build(
          presentation.id,
          presentation.name,
          presentation.type,
          presentation.netQuantity,
          presentation.unitOfMeasure
        )
      )
    );
    this.ensurePresentationsLimitIsValid(presentations);
  }

  private ensurePresentationsLimitIsValid(
    presentations: Array<PresentationPrimitives>
  ): void {
    if (presentations.length > ProductPresentations.MAX_PRESENTATIONS) {
      throw new Error('Un producto no puede tener mas de 5 presentaciones');
    }
  }

  public toPrimitives(): PresentationPrimitives[] {
    return this.getValue().map((presentation) => presentation.toPrimitives());
  }
}
