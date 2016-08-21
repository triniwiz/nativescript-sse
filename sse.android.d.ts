import { Observable } from 'data/observable';
export declare class SSE extends Observable {
    private _sseHandler;
    private _es;
    private _headers;
    private _url;
    private _thread;
    constructor(url: string, headers?: any);
    connect(): void;
    close(): void;
}
