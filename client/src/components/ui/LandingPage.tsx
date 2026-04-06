import { useState , useRef , useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

function HomePage() {

  const [onbutton, setOnButton] = useState(false);
  const welcome = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const nav = useNavigate();

  useLayoutEffect(() => {
    gsap.from(welcome.current , {
      opacity: 0,
      y: -20,
      duration: 1,
      delay: 0.2,
    });
  }, []);

  function getStarted(){
    setTimeout(() => {
        setOnButton(true);
    }, 500);

    gsap.to(welcome.current,{
      opacity:0,
      duration:1.8,
      scale : 0.4,
    });

    gsap.to(buttonRef.current ,{
      scale : 1.5,
      duration : 3,
      delay : 0.5,
    });

    setTimeout(() => {
        nav('/dashboard');
    } , 2400);
    
  }

  return (
    <div className="h-screen w-full bg-gradient-to-b from-slate-900 to-gray-950 text-white flex flex-col justify-center items-center">
      <span ref={welcome} className="lg:text-5xl text-3xl">
        Welcome to SocketTalk
      </span>
      <div className='flex'>
        <div>
        <button ref={buttonRef} onClick={getStarted} className={onbutton ? `lg:text-3xl text-2xl` :`lg:text-xl text-md font-semibold mt-7 bg-white text-black lg:px-5 px-3 lg:py-3 py-2 rounded-lg hover:shadow-lg hover:shadow-purple-800 transition-shadow duration-300`}>
          {onbutton ?  "Starting Socket Engine" : "Get Started ?" }
        </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
