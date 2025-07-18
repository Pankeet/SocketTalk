import { useContext, useEffect, useRef, useState } from "react"
import Send from "../icons/getStarted";
import { RefContext } from "../context/RefContext";

export default function ChatRoom(){

    function sendMessage(){

        if(sendMsg.current?.value.trim() === ""){
            alert("To send Message , input cannot be empty")
        }

        else{
        ws.current.send(JSON.stringify({
            type : "chat",
            payload : {
                message : sendMsg?.current?.value
            }
    }))
        }

        if (sendMsg.current) {
            sendMsg.current.value = "";
        }
    }

    const context = useContext(RefContext);
    const [msg , setmsg] = useState<string []>([]);
    const sendMsg = useRef<HTMLInputElement>(null);

    // @ts-ignore
    const { ws } = context;

    useEffect(() =>{
        ws.current.onmessage = (event : MessageEvent) => {
            setmsg(m => [...m , event.data]);
        }

        return () => {
            ws.current.onmessage = null;
        };
    })
    return <>
        <div className="flex flex-col justify-end items-center h-screen w-full bg-gray-950 text-white">
            <div>
                {msg.map((message, index) => <div key={index} 
className="font-serif text-lg bg-gray-300 rounded-lg text-black px-7 py-1 m-3 max-w-80 break-words">
                    {message}
                </div>)}
            </div>
        <div className="flex justify-between mb-10">
            <input ref={sendMsg} type="text" className="px-5 py-2 rounded-full text-black" />
            <button type="submit" onClick={sendMessage} className="ml-3"><Send /></button>
        </div>
    </div>  
    </>
}
