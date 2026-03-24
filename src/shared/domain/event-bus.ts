import { DomainEvent, DomainEventPayload } from './domain-event';

export interface EventBus {
  publish(events: DomainEvent<DomainEventPayload>[]): Promise<void>;
}
