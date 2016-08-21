#NativeScript Server Sent Events
A client for Server-Sent Events

##Install
`npm install nativescript-sse`

##Usage

```
import {SSE} from 'nativescript-sse';

let sse = new SSE(serverApi:String,headers:object);
see.connect();
sse.on('onConnect', (data)=> {
            console.log(data.object.connected);
        });
        sse.on('onMessage', (data)=> {
            this.list.push(JSON.parse(data.object.message.data))
        });
        sse.on('onComment', (data)=> {
            console.log(data.object.comment);
        });
        sse.on('onError', (data)=> {
            console.log(data.object.error);
        });
        sse.on('willReconnect', (data)=> {
            console.log(data.object.willReconnect);
        }
see.close()
```