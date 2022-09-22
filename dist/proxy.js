"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initApp = void 0;
const port = process.env.PORT || 3005;
// https://partners.viber.com/
function initApp(app) {
    app.post("/webhook", (req, res) => {
        console.log("webhook", req.body);
        res.send("recieved" + req.body);
        if (req.body.sdfsdf === '') {
        }
    });
}
exports.initApp = initApp;
const data = {
    receiver: "viber.user.id",
    type: "text",
    text: "hello world",
};
//# sourceMappingURL=proxy.js.map