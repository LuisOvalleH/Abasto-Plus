import { DomainEvent, DomainEventPayload } from './domain-event';

export interface DomainEventSubscriber {
  subscribedTo(): string[];
  on(event: DomainEvent<DomainEventPayload>): Promise<void>;
}
