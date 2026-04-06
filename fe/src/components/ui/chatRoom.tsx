import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { RefContext, type RefContextType } from "../context/RefContext";
import Send from "../icons/getStarted";

type ChatMessage = {
    message: string;
    name: string;
};

export default function ChatRoom(){
    
    const {ws} = useContext(RefContext) as RefContextType;
    const sendMsg = useRef<HTMLInputElement>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const location = useLocation();
    const username = location.state?.username || "Anonymous";

    useEffect(() =>{
        if (!ws.current) return;
        ws.current.onmessage = (event : MessageEvent) => {
            const data = JSON.parse(event.data);
            if (data.type === "user_left") {
            setMessages((prev) => [...prev,
                {
                    message: data.message,
                    name: "System",
                },
            ]);
            } 
            if(data.type === "chat"){
                setMessages((prevMessages) => [...prevMessages, {
                    message: data.message,
                    name: data.name 
                }]);
            }
        };
    }, [ws]);

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
            <div>
                {messages.map((msg, index) => <div key={index} className="font-serif text-lg bg-gray-300 rounded-lg text-black px-7 py-2 m-3 max-w-80 break-words">
                    <strong className="text-red-400">{msg.name} : </strong>{msg.message}
                </div>)}
            </div>
            <div className="flex justify-between mb-10">
                <input ref={sendMsg} type="text" className="px-5 py-2 rounded-full text-black" />
                <button type="submit" onClick={sendMessage} className="ml-3"><Send /></button>
            </div>
        </div>  
    )
}
