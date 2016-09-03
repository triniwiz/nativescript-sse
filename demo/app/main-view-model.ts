import {Observable} from 'data/observable';
import {ObservableArray} from 'data/observable-array';
import {SSE} from 'nativescript-sse';

export class HelloWorldModel extends Observable {
    list: ObservableArray<any>;
    sse: any;

    constructor() {
        super();
        this.list = new ObservableArray();
        this.sse = new SSE('http://localhost:8000',{'X-Token':"Test1234"});
        this.sse.events.on('onConnect', (data)=> {
            console.log(data.object.connected);
        });
        this.sse.events.on('onMessage', (data)=> {
            this.list.push(JSON.parse(data.object.message.data))
            console.dump(JSON.parse(data.object.message.data))
        });
        this.sse.events.on('onError', (data)=> {
            console.log(data.object.error);
        });
    }
}