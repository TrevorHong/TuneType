import './Navbar.css'

function Navbar() {
  return (<nav className = "nav">
    <a href = "/" className="Title">Tune Type</a>
    <ul>
        <li><a href = "/" >mode 1</a></li>
        <li><a href = "/" >mode 2</a></li>
        <li><a href = "/" >mode 3</a></li>  
    </ul>

  </nav>
  )
}

export default Navbar