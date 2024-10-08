import { useState } from 'react'
import DropdownMenu from '../DropdownMenu/DropdownMenu'
import './Modes.css'
import {Link} from 'react-router-dom'

function Modes() {
    const[openModes, setopenModes] = useState(false);
    return (
    <nav className = "modesNav">
        <ul>
            {openModes && <DropdownMenu/>}
            <li><Link to = "/" onClick={() => setopenModes((prev) => !prev)}>Modes</Link></li>
            <li><Link to = "/" >Easy</Link></li>
            <li><Link to = "/" >Medium</Link></li>
            <li><Link to = "/" >Hard</Link></li>  
        </ul>
    </nav>
    )
  
}

export default Modes