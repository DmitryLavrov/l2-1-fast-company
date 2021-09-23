import React from 'react'
import {NavLink} from 'react-router-dom'

const NavBar = () => {
  return (
    <ul className="nav">
      <li className="nav-item">
        <NavLink to="/" exact className="nav-link" activeStyle={{fontWeight: 'bold'}}>Main</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/login" className="nav-link" activeStyle={{fontWeight: 'bold'}}>Login</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/users" className="nav-link" activeStyle={{fontWeight: 'bold'}}>Users</NavLink>
      </li>
    </ul>
  )
}

export default NavBar
