
import './App.css'
import Modes from './Components/Modes/Modes.tsx'
import Navbar from './Components/Navbar/Navbar.tsx'
import {Route, Routes} from "react-router-dom"
import Profile from './pages/Profile.tsx'
import Statistics from './pages/Statistics.tsx'
import Settings from './pages/Settings.tsx'
import Typing from './Components/TypingMenu/Typing.tsx'
import MusicType from './pages/MusicType.tsx'


function App() {

  return (
    <>
   <Navbar/>
   <Modes/>
   <div className='container'>
    <Routes>
      <Route path = "/statistics" element = {<Statistics/>}></Route>
      <Route path = "/settings" element = {<Settings/>}></Route>
      <Route path = "/profile" element = {<Profile/>}></Route>
      <Route path = "/MusicType" element = {<MusicType/>}></Route>
    </Routes>
   </div>
   <Typing></Typing>
    </>
    
  )
}

export default App
