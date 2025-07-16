import { useContext, useEffect, useRef, useState  } from "react"
import gsap from "gsap";
import { RefContext } from "../../RefContext";
import { useNavigate } from "react-router-dom";

// Add Empty input checks 
export default function Home(){

    const nav = useNavigate();
    const context = useContext(RefContext);
    const [create , setCreate] = useState(false);
    const [join , setjoin ] = useState(false);
    const createRoom = useRef<HTMLDivElement>(null);
    const creatingRoom = useRef<HTMLDivElement>(null);
    const roomID = useRef<HTMLInputElement>(null);
    const joinID = useRef<HTMLInputElement>(null);

    // Destruct ws ref object from context;
    const { ws } = context;

    useEffect(() => {
        if(!ws.current){
        ws.current = new WebSocket("http://localhost:8080") ;
        }
    },[ws])

    function animateJoinRoom(){
        gsap.to(creatingRoom.current,{
            scaleX : 0.5,
            opacity : 0,
        });
        nav('/chat');
    }

    function createMeeting(){
        gsap.to(createRoom.current , {
            rotateY : 180,
            duration : 1.2 ,
            ease : "power2.inOut",
            scaleX : 1.5,
            opacity : 0
        });

    }
   
    function CreateRoomfn(){
        const createroom  = roomID?.current?.value;
        // @ts-ignore
        ws.current.send(JSON.stringify({
            type : "join",
            payload : {
                roomId : createroom
            } 
        }))
        animateJoinRoom();
    }

    function JoinRoomfn(){
        const joinroom = joinID?.current?.value;
        //@ts-ignore
        ws.current.send(JSON.stringify({
            type : "join",
            payload : {
                roomID : joinroom
            }
        }));
       animateJoinRoom();
    }

    return (
        <div className="h-screen min-w-full grid place-content-center text-white bg-gradient-to-r from-gray-950 to-black">
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
                    <button 
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
            {create && <div ref={creatingRoom} className="font-serif border border-white p-4 flex flex-col justify-center items-center">
                    <div> <span className="text-xl p-3" >Enter Your RoomId to create Custom Room</span></div>
                       <div>
                       <input
                            type="text"
                            placeholder="Type here..."
                            ref={roomID}
                            className="mt-5 w-full px-4 py-2 bg-transparent border border-gray-700 text-white placeholder-gray-500 rounded-xl 
                            focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
                            />
                        </div>
                    <div>
                        <button type='submit' onClick={CreateRoomfn} className="border-white text-amber-400 mt-4 px-4 py-2 border rounded-lg hover:shadow-md hover:shadow-amber-200 transition-all duration-300">Create</button>
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
                        </div>
                    <div>
                        <button type='submit' onClick={JoinRoomfn} className="border-white text-amber-400 mt-4 px-4 py-2 border rounded-lg hover:shadow-md hover:shadow-amber-200 transition-all duration-300">Join</button>
                    </div>
                </div>}
        </div>
    )

}