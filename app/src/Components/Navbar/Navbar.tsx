import './Navbar.css'
import {Link} from 'react-router-dom'

function Navbar() {
  return (
  <nav className = "nav">
    <a href = "/NormalType/Medium" className="Title">Tune Type</a>
    <ul>
        <li><Link to = "/statistics" >Statistics</Link></li>
        <li><Link to = "/settings" >Setting</Link></li>
        <li><Link to = "/profile" >Profile</Link></li>  
    </ul>
  </nav>
  )
}


export default Navbar