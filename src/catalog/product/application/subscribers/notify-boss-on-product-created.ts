import { injectable } from 'inversify';
import {
  DomainEvent,
  DomainEventPayload,
} from '../../../../shared/domain/domain-event';
import { DomainEventSubscriber } from '../../../../shared/domain/domain-event-subscriber';

@injectable()
export class NotifyBossOnProductCreated implements DomainEventSubscriber {
  public subscribedTo(): string[] {
    return ['catalog.product_created'];
  }

  public async on(event: DomainEvent<DomainEventPayload>): Promise<void> {
    console.log('Notify boss:', event.payload);
  }
}
