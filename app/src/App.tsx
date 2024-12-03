import './App.css';
import Navbar from './Components/Navbar/Navbar.tsx';
import { Route, Routes } from 'react-router-dom';
import Profile from './Pages/Profile.tsx';
import Statistics from './Pages/Statistics.tsx';
import Settings from './Pages/Settings.tsx';
import MusicType from './Pages/MusicType.tsx';
import NormalType from './Pages/NormalType.tsx';
import Modes from './Components/Modes/Modes.tsx';
// import Studying from './pages/Studying.tsx'
import StudyingActivity from './Pages/StudyingActivity.tsx';

function App() {
 

  return (
    <>
      <Navbar />
      <Modes />
      <div className="container">
        <Routes>
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/MusicType" element={<MusicType />} />
          <Route path="/StudyingActivity" element={<StudyingActivity/>} />
          <Route path="/NormalType" element={<NormalType />}>
            <Route path="/NormalType/Easy" />
            <Route path="/NormalType/Medium" />
            <Route path="/NormalType/Hard" />
          </Route>
        </Routes>
      </div>

    </>
  );
}

export default App;
