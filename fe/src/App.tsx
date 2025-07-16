import './App.css';
import { RefProvider } from './components/context/RefProvider';
import { HashRouter as Router , Routes , Route } from 'react-router-dom';
import HomePage from './components/ui/WelcomePage';
import Home from './components/ui/Home';
import ChatRoom from './components/ui/chatRoom';


export default function App(){
    return (
      <RefProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path='/chat' element={<ChatRoom />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
      </RefProvider>
    )
}

function Error(){
    return (
    <div className='h-screen text-5xl grid place-content-center text-red-400'>
    ERROR - 404
    </div>
  )
}