# NativeScript Server Sent Events

[![npm](https://img.shields.io/npm/v/nativescript-sse.svg)](https://www.npmjs.com/package/nativescript-sse)
[![npm](https://img.shields.io/npm/dt/nativescript-sse.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-sse)
[![Build Status](https://travis-ci.org//triniwiz/nativescript-sse.svg?branch=master)](https://travis-ci.org/triniwiz/nativescript-sse)


A NativeScript client for the Server Sent Events (SSE).

## Install

`npm install nativescript-sse`

## Usage

```ts
import { SSE } from 'nativescript-sse';

let sse = new SSE(serverApi: string, headers: object);
sse.events.on('onConnect', (data) => {
    console.log(data.object.connected);
});
sse.events.on('onMessage', (data) => {
    this.list.push(JSON.parse(data.object.message.data))
});
sse.events.on('onError', (data) => {
    console.log(data.object.error);
});
see.close();
```
