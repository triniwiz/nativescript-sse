var SSE = require("nativescript-sse").SSE;
var sse = new SSE('http://localhost:8000/sse', {'X-Token': 'Test1234'});

describe("Events", function() {
    it("exists", function() {
        expect(sse.events).toBeDefined();
    });

    it("has on method", function() {
        expect(sse.events.on).toBeDefined();
    });
});