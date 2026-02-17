export abstract class ValueObject<T> {
  protected readonly value: T;

  protected constructor(value: T) {
    this.value = value;
  }

  public equals(other: ValueObject<T>): boolean {
    return this.value === other.value;
  }

  public valueOf(): T {
    return this.value;
  }

  public toString(): string {
    return String(this.value);
  }
}