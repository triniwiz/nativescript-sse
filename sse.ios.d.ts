import { Observable } from 'tns-core-modules/data/observable';
export declare class SSE {
    private _headers;
    private _url;
    private _es;
    events: Observable;
    constructor(url: string, headers?: any);
    addEventListener(event: string): void;
    removeEventListener(event: string): void;
    connect(): void;
    close(): void;
}
