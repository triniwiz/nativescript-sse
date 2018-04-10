import { BaseSSE } from './sse.common';
import { Observable, fromObject } from 'tns-core-modules/data/observable';
declare const WeakRef, EventSource;
export class SSE extends BaseSSE {
  private _headers: NSDictionary<any, any>;
  private _url: any;
  private _es: any;
  protected events: Observable;
  constructor(url: string, headers: any = {}) {
    super(url, headers);
    this.events = fromObject({});
    this._url = url;
    this._headers = NSDictionary.alloc().initWithDictionary(headers);
    this._es = EventSource.alloc().initWithUrlHeaders(this._url, this._headers);
    const ref = new WeakRef(this);
    const owner = ref.get();
    this._es.onMessage((id, event, data) => {
      owner.events.notify({
        eventName: 'onMessage',
        object: fromObject({
          event: event,
          message: { data: data, lastEventId: id }
        })
      });
    });
    this._es.onError(err => {
      owner.events.notify({
        eventName: 'onError',
        object: fromObject({
          error: err.localizedDescription
        })
      });
    });
    this._es.onOpen(() => {
      owner.events.notify({
        eventName: 'onConnect',
        object: fromObject({
          connected: true
        })
      });
    });
  }
  public addEventListener(event: string): void {
    if (!this._es) return;
    const ref = new WeakRef(this);
    const owner = ref.get();
    this._es.addEventListenerHandler(event, (id, event, data) => {
      owner.events.notify({
        eventName: 'onMessage',
        object: fromObject({
          event: event,
          message: { data: data, lastEventId: id }
        })
      });
    });
  }
  public removeEventListener(event: string): void {
    if (!this._es) return;
    this._es.removeEventListener(event);
  }
  public connect(): void {
    if (!this._es) return;
    this._es.connect();
  }
  public close(): void {
    if (!this._es) return;
    this._es.close();
  }
}
