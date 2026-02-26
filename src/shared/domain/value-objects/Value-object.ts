export abstract class ValueObject<T> {
  private readonly value: T;

  protected constructor(value: T) {
    this.value = value;
  }

  protected getValue(): T {
    return this.value;
  }

  public toString(): string {
    return String(this.getValue());
  }
}
