declare var EventSource;
import { fromObject, Observable } from 'tns-core-modules/data/observable';
export class SSE {
  private _headers: NSDictionary<any, any>;
  private _url: any;
  private _es: any;
  events: Observable;
  constructor(url: string, headers: any = {}) {
    this.events = fromObject({});
    this._url = url;
    this._headers = NSDictionary.dictionaryWithDictionary(<any>headers);
    this._es = EventSource.alloc().initWithUrlHeaders(this._url, this._headers);
    this._es.onMessage((id, event, data) => {
      this.events.notify({
        eventName: 'onMessage',
        object: fromObject({
          event: event,
          message: { data: data, lastEventId: id }
        })
      });
    });
    this._es.onError(err => {
      this.events.notify({
        eventName: 'onError',
        object: fromObject({
          error: err.localizedDescription
        })
      });
    });
    this._es.onOpen(() => {
      this.events.notify({
        eventName: 'onConnect',
        object: fromObject({
          connected: true
        })
      });
    });
  }
  addEventListener(event: string) {
    this._es.addEventListenerHandler(event, (id, event, data) => {
      this.events.notify({
        eventName: 'onMessage',
        object: fromObject({
          event: event,
          message: { data: data, lastEventId: id }
        })
      });
    });
  }
  removeEventListener(event: string) {
    this._es.removeEventListener(event);
  }
  connect() {
    this._es.connect();
  }
  close() {
    this._es.close();
  }
}
