import { useContext, useEffect, useRef, useState  } from "react";
import { useNavigate } from "react-router-dom";
import { RefContext, type RefContextType } from "../context/RefContext";
import gsap from "gsap";
import nProgress from "nprogress";
import 'nprogress/nprogress.css';
 
export default function Home(){

    const nav = useNavigate();
    const [create , setCreate] = useState(false);
    const [join , setjoin ] = useState(false);
    const createRoom = useRef<HTMLDivElement>(null);
    const creatingRoom = useRef<HTMLDivElement>(null);
    const roomID = useRef<HTMLInputElement>(null);
    const joinID = useRef<HTMLInputElement>(null);
    const userId = useRef<HTMLInputElement>(null);
    
    const { ws, connected } = useContext(RefContext) as RefContextType;

    async function animateJoinRoom(){
        if(!creatingRoom.current) return;
        gsap.to(creatingRoom.current,{
            scale : 0.5,
            opacity : 0,
            duration : 0.6,
            delay : 0.1
        });
        setTimeout(() => {
            nav('/chat',{
                state : {
                    username : userId.current?.value || "Anonymous",
                    roomID : create ? roomID.current?.value : joinID.current?.value
                }
            });
        }, 600);   
    }

    async function createMeeting(){
        if(!createRoom.current) return;
        gsap.to(createRoom.current , {
            rotateY : 180,
            duration : 1.2 ,
            ease : "power2.inOut",
            scaleX : 1.5,
           opacity : 0
        });
    }
   
    function CreateRoomfn(){
        let roomValue = "";

        if (create && roomID.current) {
            roomValue = roomID.current.value;
        } else if (join && joinID.current) {
            roomValue = joinID.current.value;
        }

        if (!roomValue || roomValue.trim() === "" || !userId.current || userId.current.value.trim() === "") {
            alert("Room ID or User Name cannot be empty");
            return;
        }  

        if (!ws.current) {
            console.error("WebSocket not connected yet");
            alert("WebSocket not connected yet ! Please wait for a moment and try again.");
            return;
        }
            ws.current.send(JSON.stringify({
                type : "join",
                payload : {
                    roomId : roomValue,
                    name : userId.current?.value || "Anonymous" 
                } 
            }))
        animateJoinRoom();
    }
    useEffect(() => {
        nProgress.start();
        if (connected) {
            nProgress.done();
        }   
    }, [connected]);
    return (
        <div className="h-screen w-full grid place-content-center text-white bg-gradient-to-b from-slate-900 to-black">
            {!create && !join && <div ref={createRoom} className="flex gap-16 border border-white p-4">
                <div>
                    <button onClick={() => {
                        setTimeout(() => {
                            setCreate(true);
                        },800);
                        createMeeting();
                        }
                    } 
                    className=" flex text-2xl rounded-lg border border-amber-600 py-2 px-5">
                    Create Room 
                    </button>
                    
                </div>

                <div>
                    <button disabled={!connected}
                    className="text-2xl rounded-lg border border-amber-600 py-2 px-5"
                    onClick={() => {
                        setTimeout(() => {
                            setjoin(true);
                        },800);
                        createMeeting();
                        }
                    } >
                        Join Room
                    </button>
                </div>
            </div>}
            {create && <div ref={creatingRoom} className="font-serif border border-white py-8 px-10 rounded-xl flex flex-col justify-center items-center">
                    <div> <span className="text-xl p-3" >Enter Your RoomId to create Custom Room</span></div>
                       <div>
                       <input
                            type="text"
                            placeholder="Type here..."
                            ref={roomID}
                            className="mt-5 w-full px-4 py-2 bg-transparent border border-gray-700 text-white placeholder-gray-500 rounded-xl 
                            focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
                            />
                             <input 
                            type="text"
                            placeholder="User Name"
                            ref={userId}
                            className="mt-5 w-full px-4 py-2 bg-transparent border border-gray-700 text-white placeholder-gray-500 rounded-xl 
                            focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
                            />  
                        </div>
                        <div className="mt-3">
                            <span className="cursor-help">Already have a room? <u className="cursor-pointer" onClick={()=> {setCreate(false);setjoin(true)}}>Join</u></span>
                        </div>
                    <div>
                        <button type='submit' onClick={CreateRoomfn} className="hover:scale-105 border-white text-amber-400 mt-4 px-4 py-2 border rounded-lg hover:shadow-md hover:shadow-amber-200 transition-all duration-300">Create</button>
                    </div>
                </div>}
                {join && <div ref={creatingRoom} className="font-serif border border-white px-10 py-7 flex flex-col justify-center items-center">
                    <div> <span className="text-xl" >Enter roomId to join</span></div>
                       <div>
                        <input
                                type="text"
                                placeholder="room id"
                                ref={joinID}
                                className="mt-5 w-full px-4 py-2 bg-transparent border border-gray-700 text-white placeholder-gray-500 rounded-xl 
                                focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
                                />
                                <input 
                                type="text"
                                placeholder="User Name"
                                ref={userId}
                                className="mt-5 w-full px-4 py-2 bg-transparent border border-gray-700 text-white placeholder-gray-500 rounded-xl 
                                focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
                                />  
                        </div>
                        <div className="mt-3">
                            <span className="cursor-help">Does not have a room? <u className="cursor-pointer" onClick={()=> {setCreate(true);setjoin(false)}}>Create</u></span>
                        </div>
                        <div>
                            <button type='submit' onClick={CreateRoomfn} className="border-white text-amber-400 mt-4 px-4 py-2 border rounded-lg hover:shadow-md hover:shadow-amber-200 transition-all duration-300">Join</button>
                        </div>
                </div>}
        </div>
    )
}