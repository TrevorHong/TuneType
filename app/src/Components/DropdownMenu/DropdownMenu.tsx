import React from 'react'
import "./DropdownMenu.css"
import {Link} from 'react-router-dom'

function DropdownMenu() {
  return (
    <div className='Dropdown-container'>
        <ul>
            <li><Link to = '/'>mode 1</Link></li>
            <li><Link to = '/'>mode 2</Link></li>
            <li><Link to = '/'>mode 3</Link></li>
        </ul>
    </div>
  )
}

export default DropdownMenu