import { Observable, ObservableArray, isAndroid } from "@nativescript/core";
import { SSE } from 'nativescript-sse';

export class HomeViewModel extends Observable {
    list: ObservableArray<string>;
    sse: SSE;
    constructor() {
        super();
        this.list = new ObservableArray();
        this.sse = new SSE(isAndroid ? 'http://10.0.2.2:8000/sse' : 'http://localhost:8000/sse', {'X-Token': 'Test1234'});
        this.sse.events.on('onConnect', data => {
            console.log(data.object.connected);
        });

        this.sse.events.on('onMessage', data => {
            this.list.push(data.object.message.data);
            console.log(data.object.message.data);
        });
        this.sse.events.on('onError', data => {
            console.log(data.object.error);
        });
    }
}
