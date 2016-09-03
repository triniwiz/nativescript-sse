declare var EventSource;
import {Observable} from 'data/observable';
export class SSE {
    private _headers: NSDictionary;
    private _url: any;
    private _es: any;
    events: Observable;
    constructor(url: string, headers: any) {
        const keysNS = new NSMutableArray();
        const valuesNS = new NSMutableArray();
        const arr = Object.keys(headers);
        this.events = new Observable();
        arr.forEach((key, index) => {
            keysNS.addObject(key);
            valuesNS.addObject(headers[key]);
        });
        this._url = url;
        this._headers = NSDictionary.dictionaryWithObjectsForKeys(valuesNS, keysNS);
        this._es = EventSource.alloc().initWithUrlHeaders(this._url, this._headers);
        this._es.onMessage((id, event, data) => {
            this.events.notify({
                eventName: 'onMessage',
                object: new Observable({
                    event: event,
                    message: { data: data, lastEventId: id }
                })
            })
        })
        this._es.onError((err) => {
            console.log(err)
            this.events.notify({
                eventName: 'onError',
                object: new Observable({
                    error: err.description
                })
            })
        });
        this._es.onOpen(() => {
            this.events.notify({
                eventName: 'onConnect',
                object: new Observable({
                    connected: true
                })
            });
        });

    }
    addEventListener(event: string) {
        this._es.addEventListenerHandler(event, (id, event, data) => {
            this.events.notify({
                eventName: 'onMessage',
                object: new Observable({
                    event: event,
                    message: { data: data, lastEventId: id }
                })
            })
        });
    }
    removeEventListener(event: string) {
        this._es.removeEventListener(event);
    }
    connnect() {
        this._es.connect();
    }
    close() {
        this._es.close();
    }
}