declare var android: any, com: any, java: any;
import { Observable, fromObject } from 'tns-core-modules/data/observable';
const EventSourceHandler = com.tylerjroach.eventsource.EventSourceHandler;
const EventSource = com.tylerjroach.eventsource.EventSource;
export class SSE {
  private _sseHandler: any;
  private _es: any;
  private _headers: any;
  private _url: any;
  private _thread: any;
  events: Observable;
  constructor(url: string, headers: any = {}) {
    this._url = new java.net.URI(url);
    this.events = fromObject({});
    const that = new WeakRef(this);
    this._sseHandler = new EventSourceHandler({
      owner: that.get(),
      onConnect() {
        this.owner.events.notify({
          eventName: 'onConnect',
          object: fromObject({
            connected: true
          })
        });
      },
      onMessage(event, message) {
        this.owner.events.notify({
          eventName: 'onMessage',
          object: fromObject({
            event: event.toString(),
            message: {
              data: message.data,
              lastEventId: message.lastEventId,
              origin: message.origin
            }
          })
        });
      },

      onComment(comment) {
        this.owner.events.notify({
          eventName: 'onComment',
          object: fromObject({
            comment: comment
          })
        });
      },

      onError(e) {
        this.owner.events.notify({
          eventName: 'onError',
          object: fromObject({
            error: e.getMessage()
          })
        });
      },
      onClosed(willReconnect) {
        this.owner.events.notify({
          eventName: 'willReconnect',
          object: fromObject({
            willReconnect: willReconnect
          })
        });
      }
    });

    this._headers = new java.util.HashMap();
    const arr = Object.keys(headers);
    if (arr.length > 0) {
      arr.forEach(key => {
        this._headers.put(key, headers[key]);
      });

      this._es = new EventSource.Builder(this._url)
        .eventHandler(this._sseHandler)
        .headers(this._headers)
        .build();
    }
  }

  addEventListener(event: string) {}
  removeEventListener(event: string) {}

  connect() {
    this._es.connect();
  }

  close() {
    this._es.close();
  }
}
