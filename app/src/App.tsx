
import './App.css'
import Modes from './Components/Modes/Modes.tsx'
import Navbar from './Components/Navbar/Navbar.tsx'
import {Route, Routes} from "react-router-dom"
import Profile from './pages/Profile.tsx'
import Statistics from './pages/Statistics.tsx'
import Settings from './pages/Settings.tsx'
import Typing from './Components/TypingMenu/Typing.tsx'
import Lyrics from "./Components/Lyrics/Lyrics.tsx";


function App() {

  return (
    <>
   <Navbar/>
   <div className='container'>
    <Routes>
      <Route path = "/statistics" element = {<Statistics/>}></Route>
      <Route path = "/settings" element = {<Settings/>}></Route>
      <Route path = "/profile" element = {<Profile/>}></Route>
    </Routes>
   </div>
   <Modes/>
   <Typing></Typing>
   <iframe src="https://open.spotify.com/embed/playlist/5tt9xN5v58QpXuuHWeTI44?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>   <Lyrics></Lyrics>
    </>
    
  )
}

export default App
