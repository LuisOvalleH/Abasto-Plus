import { PresentationId } from './presentation/presentation-id';
import { PresentationName } from './presentation/presentation-name';
import { PresentationNetQuantity } from './presentation/presentation-net-quantity';
import { PresentationType } from './presentation/presentation-type';
import { PresentationUnitOfMeasure } from './presentation/presentation-unit-of-measure';

export type PresentationPrimitives = {
  id: string;
  name: string;
  type: string;
  netQuantity: number;
  unitOfMeasure: string;
};

export class Presentation {
  private readonly presentationId: PresentationId;
  private readonly presentationName: PresentationName;
  private readonly presentationType: PresentationType;
  private readonly presentationNetQuantity: PresentationNetQuantity;
  private readonly presentationUnitOfMeasure: PresentationUnitOfMeasure;

  private constructor(
    presentationId: PresentationId,
    presentationName: PresentationName,
    presentationType: PresentationType,
    presentationNetQuantity: PresentationNetQuantity,
    presentationUnitOfMeasure: PresentationUnitOfMeasure
  ) {
    this.presentationId = presentationId;
    this.presentationName = presentationName;
    this.presentationType = presentationType;
    this.presentationNetQuantity = presentationNetQuantity;
    this.presentationUnitOfMeasure = presentationUnitOfMeasure;
  }

  public static build(
    id: PresentationPrimitives['id'],
    name: PresentationPrimitives['name'],
    type: PresentationPrimitives['type'],
    netQuantity: PresentationPrimitives['netQuantity'],
    unitOfMeasure: PresentationPrimitives['unitOfMeasure']
  ): Presentation {
    return new Presentation(
      new PresentationId(id),
      new PresentationName(name),
      new PresentationType(type),
      new PresentationNetQuantity(netQuantity),
      new PresentationUnitOfMeasure(unitOfMeasure)
    );
  }
}
