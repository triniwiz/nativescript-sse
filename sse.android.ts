declare var android: any, com: any, java: any;
import {Observable} from 'data/observable';
const EventSourceHandler = com.tylerjroach.eventsource.EventSourceHandler;
const EventSource = com.tylerjroach.eventsource.EventSource;
export class SSE {
    private _sseHandler: any;
    private _es: any;
    private _headers: any;
    private _url: any;
    private _thread: any;
    events: Observable;
    constructor(url: string, headers?: any) {
        this._url = new java.net.URI(url);
        this.events = new Observable();
        const that = new WeakRef(this);
        this._sseHandler = new EventSourceHandler({
            owner: that.get(),
            onConnect() {
                this.owner.events.notify({
                    eventName: 'onConnect',
                    object: new Observable({
                        connected: true
                    })
                })
            },
            onMessage(event, message) {
                this.owner.events.notify({
                    eventName: 'onMessage',
                    object: new Observable({
                        event: event.toString(),
                        message: { data: message.data, lastEventId: message.lastEventId, origin: message.origin }
                    })
                })
            },

            onComment(comment) {
                this.owner.events.notify({
                    eventName: 'onComment',
                    object: new Observable({
                        comment: comment
                    })
                })
            },

            onError(e) {
                this.owner.events.notify({
                    eventName: 'onError',
                    object: new Observable({
                        error: e.getMessage()
                    })
                })
            },
            onClosed(willReconnect) {
                this.owner.events.notify({
                    eventName: 'willReconnect',
                    object: new Observable({
                        willReconnect: willReconnect
                    })
                })
            }
        });

        if (headers) {
            this._headers = new java.util.HashMap();
            const arr = Object.keys(headers);
            if (arr.length > 0) {
                arr.forEach((key) => {
                    this._headers.put(key, headers[key]);
                });

                this._es = new EventSource.Builder(this._url)
                    .eventHandler(this._sseHandler)
                    .headers(this._headers)
                    .build();
                this._es.connect();
            } else {
                throw new Error('Headers cannot be empty')
            }
        } else {
            this._es = new EventSource.Builder(this._url)
                .eventHandler(this._sseHandler)
                .build();
            this._es.connect();
        }

    }

    connect() {
        const that = new WeakRef(this);
        this._thread = new java.lang.Thread(new java.lang.Runnable({
            owner: that.get(),
            run() {
                try {
                    console.log('running in a thread');
                    this.owner._es.connect();
                } catch (e) {
                    console.dump(e)
                }
            }
        }));
        this._thread.start();
    }

    close() {
        this._es.close();
        this._thread = null;
    }
}
