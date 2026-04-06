"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let AllSockets = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        var _a;
        const ParsedMsg = JSON.parse(message.toString());
        if (ParsedMsg.type === 'join') {
            AllSockets.push({
                socket,
                room: ParsedMsg.payload.roomId,
                name: ParsedMsg.payload.name
            });
        }
        if (ParsedMsg.type === 'chat') {
            const senderRoom = (_a = AllSockets.find((x) => x.socket === socket)) === null || _a === void 0 ? void 0 : _a.room;
            if (!senderRoom)
                return;
            for (const client of AllSockets) {
                if (client.room === senderRoom) {
                    client.socket.send(JSON.stringify({
                        type: "chat",
                        message: ParsedMsg.payload.message,
                        name: ParsedMsg.payload.name
                    }));
                }
            }
        }
    });
    socket.on("close", () => {
        const user = AllSockets.find(u => u.socket === socket);
        if (!user)
            return;
        AllSockets = AllSockets.filter(user => user.socket !== socket);
        for (const clients of AllSockets) {
            if (clients.room === user.room) {
                clients.socket.send(JSON.stringify({
                    type: "user_left",
                    message: `${user.name} has left the room !`
                }));
            }
        }
    });
});
