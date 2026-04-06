import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { RefContext, type RefContextType } from "../context/RefContext";
import Send from "../icons/getStarted";

type ChatMessage = {
    message: string;
    name: string;
};

export default function ChatRoom(){
    
    const { ws } = useContext(RefContext) as RefContextType;
    const sendMsg = useRef<HTMLInputElement>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const location = useLocation();
    const username = location.state?.username || "Anonymous";
    const roomName = location.state?.roomID;
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    if (!ws.current) return;
    const socket = ws.current;

    const handler = (event: MessageEvent) => {
        const data = JSON.parse(event.data);

        if (data.type === "user_left") {
            setMessages(prev => [...prev, {
                message: data.message,
                name: "System",
            }]);
        }

        if (data.type === "chat") {
            setMessages(prev => [...prev, {
                message: data.message,
                name: data.name
            }]);
        }
    };

    socket.addEventListener("message", handler);

    return () => {
        socket.removeEventListener("message", handler);
    };
}, [ws,messages]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    function sendMessage(){
        if(!sendMsg.current) return;
        if(!ws.current) return;

        const value = sendMsg.current?.value;
        if(!value || value?.trim() === ""){
            alert("To send Message , input cannot be empty");
            return;
        }

        ws.current.send(JSON.stringify({
            type : "chat",
            payload : {
                message : sendMsg.current.value,
                name : username
            }
        }));
        sendMsg.current.value = "";
    }

    return (
        <div className="flex flex-col justify-end items-center h-screen w-full bg-gray-950 text-white">
            <span className="text-xl lg:text-3xl font-semibold lg:font-bold mt-5 fixed lg:left-10 left-5 lg:top-6 top-3">Chat Room</span>
            <span className="text-md lg:text-base text-gray-400 fixed lg:left-11 left-5 lg:top-20 top-16 ">Room Name is: {roomName}</span>
            <div className="w-full max-w-72 md:max-w-xl lg:max-w-2xl flex flex-col gap-3 lg:p-10 p-2 mb-3 overflow-y-auto mt-24 md:mt-auto">
                {messages.map((msg, index) => {
                const isMe = msg.name === username;

                return (
                    <div
                        key={index}
                        className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                    >
                        <div className={`max-w-xs px-4 py-2 rounded-2xl break-words ${isMe ? "bg-green-500 text-white rounded-br-none" : "bg-gray-300 text-black rounded-bl-none"}`}>
                            <div className="text-xs font-semibold text-gray-600 mb-1">{!isMe ? msg.name : "You"}</div>
                            <div className="text-sm">{msg.message}</div>
                        </div>
                    </div>
                );
                })}
                <div ref={bottomRef} />
            </div>
            <div className="flex justify-between mb-10">
                <input
                    ref={sendMsg}
                    type="text"
                    className="px-5 py-2 rounded-full text-black"
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                        }
                    }}
                />
                <button type="submit" onClick={sendMessage} className="ml-3"><Send /></button>
            </div>
        </div>  
    )
}
