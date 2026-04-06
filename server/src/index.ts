import { WebSocketServer , WebSocket } from "ws";
const wss = new WebSocketServer({port : 8080});

interface User {
    socket : WebSocket;
    room : string;
    name : string;
}

let AllSockets : User[] = [];

wss.on("connection" , (socket) => {
    socket.on("message" , (message : string) =>{
        const ParsedMsg = JSON.parse(message.toString());
        if(ParsedMsg.type === 'join'){
            AllSockets.push({
                socket,
                room : ParsedMsg.payload.roomId,
                name : ParsedMsg.payload.name
        });
        }

        if(ParsedMsg.type === 'chat'){
            const senderRoom = AllSockets.find((x) => x.socket === socket)?.room;
            if(!senderRoom) return;
            for(const client of AllSockets){
                if(client.room === senderRoom){
                    client.socket.send(JSON.stringify({
                        type : "chat",
                        message: ParsedMsg.payload.message,
                        name: ParsedMsg.payload.name
                    }));
                }
            }
        }
    });

        socket.on("close" , () =>{
            const user = AllSockets.find(u => u.socket === socket);
            if (!user) return;

            AllSockets = AllSockets.filter(user => user.socket !== socket);
            for(const clients of AllSockets){
                if(clients.room === user.room){
                    clients.socket.send(JSON.stringify({
                        type : "user_left",
                        message : `${user.name} has left the room !`
                    }));
                }
            }
        })
});