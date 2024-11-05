
import './App.css'
import Navbar from './Components/Navbar/Navbar.tsx'
import {Route, Routes} from "react-router-dom"
import Profile from './pages/Profile.tsx'
import Statistics from './pages/Statistics.tsx'
import Settings from './pages/Settings.tsx'
import MusicType from './pages/MusicType.tsx'
import NormalType from './pages/NormalType.tsx'
import Modes from './Components/Modes/Modes.tsx'


function App() {

  return (
    <>
   <Navbar/>
   <Modes></Modes> 
   <div className='container'>
    <Routes>
      <Route path = "/statistics" element = {<Statistics/>}></Route>
      <Route path = "/settings" element = {<Settings/>}></Route>
      <Route path = "/profile" element = {<Profile/>}></Route>
      <Route path = "/MusicType" element = {<MusicType/>}></Route>
      <Route path = "/NormalType" element = {<NormalType/>}>
        <Route path = "/NormalType/Easy"/>
        <Route path = "/NormalType/Medium"/>
        <Route path = "/NormalType/Hard"/>
      </Route>
    </Routes>
   </div>
    </>
    
  )
}

export default App
