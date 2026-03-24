export type DomainEventPayload = Record<string, unknown>;

export abstract class DomainEvent<TPayload extends DomainEventPayload> {
  public readonly occurredOn: Date;

  constructor(
    public readonly eventName: string,
    public readonly payload: TPayload,
    occurredOn?: Date
  ) {
    this.occurredOn = occurredOn ?? new Date();
  }
}
