import { DomainEvent, DomainEventPayload } from './domain-event';

export interface EventConsumer {
  consume(
    key: string,
    limit: number
  ): Promise<DomainEvent<DomainEventPayload>[]>;
}
