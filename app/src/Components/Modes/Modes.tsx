import { useEffect, useState } from 'react';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import './Modes.css';
import { Link, useLocation } from 'react-router-dom';

function Modes() {
    const [openModes, setOpenModes] = useState(false);
    const location = useLocation(); 

    useEffect(() => { 
        console.log(location.pathname + " hello this is test");
    }, [location]);



    switch(location.pathname){
        case'/NormalType/Easy':
        return(<nav className="modesNav">
            <ul>
                {openModes && <DropdownMenu setopenModes={setOpenModes} />}
                <li><a onClick={() => setOpenModes(prev => !prev)}>Modes</a></li>
                <li><Link to="/NormalType/Easy">Easy</Link></li>
                <li><Link to="/NormalType/Medium">Medium</Link></li>
                <li><Link to="/NormalType/Hard">Hard</Link></li>
            </ul>
        </nav>)
        case'/NormalType/Medium':
        return( <nav className="modesNav">
            <ul>
                {openModes && <DropdownMenu setopenModes={setOpenModes} />}
                <li><a onClick={() => setOpenModes(prev => !prev)}>Modes</a></li>
                <li><Link to="/NormalType/Easy">Easy</Link></li>
                <li><Link to="/NormalType/Medium">Medium</Link></li>
                <li><Link to="/NormalType/Hard">Hard</Link></li>
            </ul>
        </nav>)
        case'/NormalType/Hard':
        return( <nav className="modesNav">
            <ul>
                {openModes && <DropdownMenu setopenModes={setOpenModes} />}
                <li><a onClick={() => setOpenModes(prev => !prev)}>Modes</a></li>
                <li><Link to="/NormalType/Easy">Easy</Link></li>
                <li><Link to="/NormalType/Medium">Medium</Link></li>
                <li><Link to="/NormalType/Hard">Hard</Link></li>
            </ul>
        </nav>)
        default:
        return(
            <nav className="modesNav">
              <ul>
                {openModes && <DropdownMenu setopenModes={setOpenModes} />}
                <li><a onClick={() => setOpenModes(prev => !prev)}>Modes</a></li>
            </ul>
            </nav>)
    }

   
}

export default Modes;
