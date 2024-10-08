
import './App.css'
import Modes from './Components/Modes/Modes.tsx'
import Navbar from './Components/Navbar/Navbar.tsx'
import {Route, Routes} from "react-router-dom"
import Profile from './pages/Profile.tsx'
import Statistics from './pages/Statistics.tsx'
import Settings from './pages/Settings.tsx'
import Typing from './Components/TypingMenu/Typing.tsx'

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
    </>
  )
}

export default App
