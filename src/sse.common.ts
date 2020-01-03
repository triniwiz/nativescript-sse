import { Observable } from 'tns-core-modules/data/observable';
export abstract class BaseSSE {
  public events: Observable;
  constructor(url: string, headers: any = {}) {}
  public abstract addEventListener(event: string): void;
  public abstract removeEventListener(event: string): void;
  public abstract connect(): void;
  public abstract close(): void;
}
