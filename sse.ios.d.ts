import { Observable } from 'data/observable';
export declare class SSE {
    events: Observable;
    constructor(url: string, headers: any);
    connnect(): void;
    close(): void;
}
