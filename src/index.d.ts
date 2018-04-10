import { BaseSSE } from './sse.common';
export declare class SSE extends BaseSSE {
  public addEventListener(event: string): void;
  public removeEventListener(event: string): void;
  public connect(): void;
  public close(): void;
}
