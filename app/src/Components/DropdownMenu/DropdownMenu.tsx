
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
            <li><Link to = '/NormalType' onClick={handleClick}>Normal Type</Link></li>
            <li><Link to = '/' onClick={handleClick}>Study Type</Link></li>
        </ul>
    </div>
  )
}

export default DropdownMenu