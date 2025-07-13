import { useState , useRef , useLayoutEffect } from 'react';
import Send from '../icons/getStarted';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

function HomePage() {

  const [onbutton, setOnButton] = useState(false);
  const sendSvg = useRef<HTMLDivElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const nav = useNavigate();

  useLayoutEffect(() => {
    gsap.from(intro.current , {
      opacity: 0,
      y: -20,
      duration: 1,
      delay: 0.2,
    });
  }, []);

  function getStarted(){
    setOnButton(true);
    gsap.to(sendSvg.current,{
      opacity : 0,
      x:600,
      duration : 4,
      delay : 0.3,
      ease : "power2.out"
    });

    gsap.to(intro.current,{
      opacity:0,
      duration:4,
      delay : 0.1,
      x : -1000,
      ease : "power2.out"
    });

    gsap.to(buttonRef.current ,{
      scale : 1.5,
      duration : 3,
    });

    setTimeout(() => {
        nav('/dashboard');
    } , 2500);
    
  }

  return (
    <div className="overflow-hidden min-h-screen w-full bg-gray-950 text-white flex flex-col justify-center items-center">
      <span ref={intro} className="text-5xl">
        Welcome to SocketTalk
      </span>
      <div className='flex'>
        <div>
        <button ref={buttonRef} onClick={getStarted} className={onbutton ? `text-2xl` :`text-xl mt-7 bg-white text-black px-3 py-2 rounded-lg hover:shadow-lg hover:shadow-amber-200 transition-all duration-200`}>
          {onbutton ?  "Starting...." : "Get Started ?" }
        </button>
        </div>
        <div ref={sendSvg} className='mt-10 ml-3 cursor-pointer' onClick={getStarted}><Send /></div>
      </div>
    </div>
  );
}

export default HomePage;
