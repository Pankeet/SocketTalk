import { useEffect, useRef, useState } from "react"
import Send from "../icons/getStarted";

export default function ChatRoom({roomId}){

    const [msg , setmsg] = useState([]);
    const sendMsg = useRef<HTMLInputElement>(null);

    function sendMessage(){
        const message = sendMsg.current?.value;
        ws
    }

    return <>
        <div className="flex flex-col justify-end items-center h-screen w-full bg-gray-950 text-white">
            <div>
                {msg.map(message => <div className="font-serif text-md">
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