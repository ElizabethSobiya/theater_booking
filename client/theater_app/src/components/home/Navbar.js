import { NavLink } from 'react-router-dom'
import './style.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <h1>Ticket Mate</h1>
        </div>
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/">Projects</NavLink>
            </li>
            <li>
              <NavLink to="/">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar