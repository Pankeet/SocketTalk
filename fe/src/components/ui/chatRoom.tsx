import { useContext, useEffect, useRef, useState } from "react"
import Send from "../icons/getStarted";
import { RefContext } from "../../RefContext";

export default function ChatRoom(){

    const context = useContext(RefContext);
    const [msg , setmsg] = useState([]);
    const sendMsg = useRef<HTMLInputElement>(null);

    const { ws } = context;

    useEffect(() =>{
        ws.current.onmessage = (event) => {
            setmsg(m => [...m , event.data]);
        }

        return () => {
            ws.current.onmessage = null;
        };
    },[])
    return <>
        <div className="flex flex-col justify-end items-center h-screen w-full bg-gray-950 text-white">
            <div>
                {msg.map((message, index) => <div key={index} className="font-serif text-md">
                    {message}
                </div>)}
            </div>
        <div className="flex justify-between mb-10">
            <input ref={sendMsg} type="text" className="px-5 py-2 rounded-full text-black" />
            <button type="submit" onClick={() => {
                ws.current.send(JSON.stringify({
                    type : "chat",
                    payload : {
                        message : sendMsg?.current?.value
                    }
            }))
            }} className="ml-3"><Send /></button>
        </div>
    </div>  
    </>
}