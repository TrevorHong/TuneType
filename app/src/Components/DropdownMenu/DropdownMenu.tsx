
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
            <li><Link to = '/NormalType/Medium' onClick={handleClick}>Normal Type</Link></li>
            <li><Link to = '/StudyingActivity' onClick={handleClick}>Study Type</Link></li>
        </ul>
    </div>
  )
}
//Push for trevor
export default DropdownMenu