var Sse = require("nativescript-sse").Sse;
var sse = new Sse();

describe("greet function", function() {
    it("exists", function() {
        expect(sse.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(sse.greet()).toEqual("Hello, NS");
    });
});