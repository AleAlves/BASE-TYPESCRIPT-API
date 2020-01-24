"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    static log(data, clazz, method, comment) {
        console.log("\n · ------------*------------ ·");
        if (clazz) {
            console.log("Class: " + clazz);
        }
        if (method) {
            console.log("Method: " + method);
        }
        if (comment) {
            console.log("Comment: " + comment);
        }
        try {
            console.log(JSON.stringify(data));
        }
        catch (error) {
            console.log(data);
        }
        console.log("· ------------*------------ ·\n");
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map