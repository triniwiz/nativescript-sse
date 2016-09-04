[![npm](https://img.shields.io/npm/v/nativescript-sse.svg)](https://www.npmjs.com/package/nativescript-sse)
[![npm](https://img.shields.io/npm/dt/nativescript-sse.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-sse)
#NativeScript Server Sent Events
A client for Server-Sent Events

##Install
`npm install nativescript-sse`

##Usage

```
import {SSE} from 'nativescript-sse';

let sse = new SSE(serverApi:string, headers:object);
sse.events.on('onConnect', (data) => {
    console.log(data.object.connected);
});
sse.events.on('onMessage', (data) => {
    this.list.push(JSON.parse(data.object.message.data))
});
sse.events.on('onError', (data) => {
    console.log(data.object.error);
});
see.close()
```
