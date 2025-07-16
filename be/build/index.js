"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let AllSockets = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        var _a;
        // @ts-ignore
        const ParsedMsg = JSON.parse(message);
        if (ParsedMsg.type === 'join') {
            console.log(ParsedMsg.payload.roomId);
            AllSockets.push({
                socket,
                room: ParsedMsg.payload.roomId,
                name: ParsedMsg.payload.name
            });
        }
        if (ParsedMsg.type === 'chat') {
            const userRoom = (_a = AllSockets.find((x) => x.socket == socket)) === null || _a === void 0 ? void 0 : _a.room;
            for (let i = 0; i < AllSockets.length; i++) {
                if (AllSockets[i].room == userRoom) {
                    AllSockets[i].socket.send(ParsedMsg.payload.message);
                }
            }
        }
    });
    socket.on("disconnect", () => {
    });
});
