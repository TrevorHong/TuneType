import React from 'react'
import "./DropdownMenu.css"
import {Link} from 'react-router-dom'

interface DropdownMenuProps {
  setopenModes: (value: boolean) => void;
}

function DropdownMenu({ setopenModes }: DropdownMenuProps) {

  const handleClick = () => {
    setopenModes(false);
};

  return (
    <div className='Dropdown-container'>
        <ul>
            <li><Link to = '/MusicType' onClick={handleClick} >Music Mode</Link></li>
            <li><Link to = '/' onClick={handleClick}>mode 2</Link></li>
            <li><Link to = '/' onClick={handleClick}>mode 3</Link></li>
        </ul>
    </div>
  )
}

export default DropdownMenu