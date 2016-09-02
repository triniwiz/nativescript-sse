declare var NSObject: any, NSURLSessionDelegate: any ,NSURL:any ,NSString:any,NSURLSession;
enum EventSourceState {
    Connecting,
    Open,
    Closed
}
export class SSE extends NSObject implements NSURLSessionDelegate {
    private _es: any;
    static DefaultsKey = "com.inaka.eventSource.lastEventId";
    url:NSURL;
    private lastEventIDKey:string;
    private receivedString:NSString;
    private onOpenCallback;
    private onErrorCallback;
    private onMessageCallBack;
    readState:EventSourceState;
    retryTime = 3000;
    private eventListeners = ;
    private headers =;
    urlSession:NSURLSession;
    task:NSURLSessionDataTask;
    operationQueue:NSOperationQueue;
    errorBeforeSetErrorCallback:NSError;
    receivedDataBuffer:NSMutableData;
    uniqueIdentifier:string;
    validNewLineCharacters = ["\r\n","\n","\r"];
    event = NSDictionary.initWithDictionary();
    constructor(url: string, headers?: any) {
        super();
    }
    connect() { }
    close() { }
}