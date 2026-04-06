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
            {!create && !join && <div ref={createRoom} className="flex lg:gap-16 gap-8 border border-white p-5 lg:p-10 rounded-xl">
                <div>
                    <button disabled={!connected}
                    className="lg:text-2xl text-lg rounded-lg border border-amber-600 py-1 lg:py-2 lg:px-5 px-3"
                    onClick={() => {
                        setTimeout(() => {
                            setCreate(true);
                        },800);
                        createMeeting();
                        }
                    } >
                    Create Room 
                    </button>
                </div>

                <div>
                    <button disabled={!connected}
                    className="lg:text-2xl text-lg rounded-lg border border-amber-600 lg:py-2 py-1 lg:px-5 px-3"
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
            {create && (
  <div
    ref={creatingRoom}
    className="w-full max-w-md mx-auto font-serif border border-white 
    px-4 sm:px-6 lg:px-10 py-5 sm:py-6 lg:py-8 
    rounded-xl flex flex-col items-center gap-4"
  >
    <div>
      <span className="text-sm sm:text-base lg:text-xl text-center block">
        Enter Your RoomId to create Custom Room
      </span>
    </div>

    <div className="w-full flex flex-col gap-4">
      <input
        type="text"
        placeholder="Type here..."
        ref={roomID}
        className="w-full px-4 py-2 bg-transparent border border-gray-700 text-white 
        placeholder-gray-500 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 
        focus:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
      />

      <input
        type="text"
        placeholder="User Name"
        ref={userId}
        className="w-full px-4 py-2 bg-transparent border border-gray-700 text-white 
        placeholder-gray-500 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 
        focus:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
      />
    </div>

    <div className="text-xs sm:text-sm text-center">
      <span>
        Already have a room?{" "}
        <u
          className="cursor-pointer"
          onClick={() => {
            setCreate(false);
            setjoin(true);
          }}
        >
          Join
        </u>
      </span>
    </div>

    <button
      type="submit"
      onClick={CreateRoomfn}
      className="w-full sm:w-auto hover:scale-105 border-white text-amber-400 
      px-4 py-2 border rounded-lg hover:shadow-md hover:shadow-amber-200 
      transition-all duration-300"
    >
      Create
    </button>
  </div>
)}

{join && (
  <div
    ref={creatingRoom}
    className="w-full max-w-md mx-auto font-serif border border-white 
    px-4 sm:px-6 lg:px-10 py-5 sm:py-6 lg:py-8 
    rounded-xl flex flex-col items-center gap-4"
  >
    <div>
      <span className="text-sm sm:text-base lg:text-xl text-center block">
        Enter a roomId to join or create room
      </span>
    </div>

    <div className="w-full flex flex-col gap-4">
      <input
        type="text"
        placeholder="room id"
        ref={joinID}
        className="w-full px-4 py-2 bg-transparent border border-gray-700 text-white 
        placeholder-gray-500 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 
        focus:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
      />

      <input
        type="text"
        placeholder="User Name"
        ref={userId}
        className="w-full px-4 py-2 bg-transparent border border-gray-700 text-white 
        placeholder-gray-500 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 
        focus:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
      />
    </div>

    <div className="text-xs sm:text-sm text-center">
      <span>
        Does not have a room?{" "}
        <u
          className="cursor-pointer"
          onClick={() => {
            setCreate(true);
            setjoin(false);
          }}
        >
          Create
        </u>
      </span>
    </div>

    <button
      type="submit"
      onClick={CreateRoomfn}
      className="w-full sm:w-auto border-white text-amber-400 
      px-4 py-2 border rounded-lg hover:shadow-md hover:shadow-amber-200 
      transition-all duration-300"
    >
      Join
    </button>
  </div>
)}
        </div>
    )
}