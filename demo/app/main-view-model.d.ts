import { Observable } from 'tns-core-modules/data/observable';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
export declare class HelloWorldModel extends Observable {
    list: ObservableArray<any>;
    sse: any;
    constructor();
}
