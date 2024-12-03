import './Navbar.css';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse: unknown) => {
    console.log(credentialResponse);
    setIsLoggedIn(true); 
    navigate('/NormalType'); 
  };

  const handleLoginError = () => {
    console.log('Login failed');
  };

  return (
    <nav className="nav">
      <a href="/NormalType/Medium" className="Title">Tune Type</a>
      <ul>
        <li>
          <Link to="/statistics">Statistics</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        {isLoggedIn && ( 
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        )}
        {!isLoggedIn && ( 
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
          />
        )}
      </ul>
    </nav>
  );
}

export {Navbar};
