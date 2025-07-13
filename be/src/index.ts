import { WebSocketServer , WebSocket } from "ws";
const wss = new WebSocketServer({port : 8080});

interface User {
    socket : WebSocket;
    room : string;
    name : string;
}

let AllSockets : User[] = [];

wss.on("connection" , (socket) => {


        socket.on("message" , (message) =>{
            // @ts-ignore
            const ParsedMsg = JSON.parse(message as string);

            if(ParsedMsg.type === 'join'){
                AllSockets.push({
                    socket,
                    room : ParsedMsg.payload.roomId,
                    name : ParsedMsg.payload.name
                })
            }

            if(ParsedMsg.type === 'chat'){
                const userRoom = AllSockets.find((x) => x.socket == socket)?.room;

                for(let i=0;i<AllSockets.length ; i++){
                    if(AllSockets[i].room == userRoom){
                        AllSockets[i].socket.send(ParsedMsg.payload.message)
                    }
                }
            }

        });

        socket.on("disconnect" , () =>{
           
        })
});