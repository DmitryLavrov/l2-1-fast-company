import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import NavProfile from './navProfile'

const NavBar = () => {
  const {currentUser} = useAuth()

  return (
    <nav className="navbar bg-info mb-4">
      <div className="d-inline-block">
        <ul className="nav">
          <li className="nav-item">
            <NavLink to="/" exact
                     className="nav-link"
                     activeStyle={{fontWeight: 'bold'}}>
              Main
            </NavLink>
          </li>

          {currentUser &&
          <li className="nav-item">
            <NavLink to="/users"
                     className="nav-link"
                     activeStyle={{fontWeight: 'bold'}}>
              Users
            </NavLink>
          </li>}
        </ul>
      </div>

      <div className="d-flex">
        {currentUser
          ? <NavProfile/>
          : <NavLink to="/login"
                     className="nav-link"
                     activeStyle={{fontWeight: 'bold'}}>
            Login
          </NavLink>
        }
      </div>
    </nav>
  )
}

export default NavBar
