
import './App.css'
import Navbar from './Components/Navbar/Navbar.tsx'
import Lyrics from "./Components/Lyrics/Lyrics.tsx";


function App() {
  
  

  return (
    <>
   <Navbar></Navbar>
   <iframe src="https://open.spotify.com/embed/playlist/5tt9xN5v58QpXuuHWeTI44?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>   <Lyrics></Lyrics>
    </>
    
  )
}

export default App
