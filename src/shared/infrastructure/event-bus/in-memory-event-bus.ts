import { injectable } from 'inversify';
import { DomainEvent, DomainEventPayload } from '../../domain/domain-event';
import { EventBus } from '../../domain/event-bus';
import { EventConsumer } from '../../domain/event-consumer';
import { DomainEventSubscriber } from '../../domain/domain-event-subscriber';

@injectable()
export class InMemoryEventBus implements EventBus, EventConsumer {
  private readonly queue: DomainEvent<DomainEventPayload>[] = [];
  private subscribers: DomainEventSubscriber[] = [];

  public addSubscribers(subscribers: DomainEventSubscriber[]): void {
    this.subscribers = subscribers;
  }

  public async publish(
    events: DomainEvent<DomainEventPayload>[]
  ): Promise<void> {
    this.queue.push(...events);
  }

  public async consume(
    key: string,
    limit: number
  ): Promise<DomainEvent<DomainEventPayload>[]> {
    const matchingEvents = this.queue.filter((event) =>
      event.eventName.startsWith(key)
    );
    const eventsToConsume = matchingEvents.slice(0, limit);

    this.queue.splice(0, this.queue.length, ...this.queue.filter((event) => !eventsToConsume.includes(event)));

    return eventsToConsume;
  }

  public async dispatchConsumedEvents(
    key: string,
    limit: number
  ): Promise<void> {
    const events = await this.consume(key, limit);

    for (const event of events) {
      const matchingSubscribers = this.subscribers.filter((subscriber) =>
        subscriber.subscribedTo().includes(event.eventName)
      );

      for (const subscriber of matchingSubscribers) {
        await subscriber.on(event);
      }
    }
  }
}
