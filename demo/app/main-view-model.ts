import {Observable} from 'data/observable';
import {ObservableArray} from 'data/observable-array';
import {SSE} from 'nativescript-sse';

export class HelloWorldModel extends Observable {
    list: ObservableArray<any>;
    sse: any;

    constructor() {
        super();
        this.list = new ObservableArray();
        this.sse = new SSE('http://localhost:8080');
        this.sse.connect();

        this.sse.on('onConnect', (data)=> {
            console.log(data.object.connected);
        });
        this.sse.on('onMessage', (data)=> {
            this.list.push(JSON.parse(data.object.message.data))
        });
        this.sse.on('onComment', (data)=> {
            console.log(data.object.comment);
        });
        this.sse.on('onError', (data)=> {
            console.log(data.object.error);
        });
        this.sse.on('willReconnect', (data)=> {
            console.log(data.object.willReconnect);
        })
    }
}