import React from 'react'
import '../styles/Header.css'
import logo from '../images/logoabuela.png'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>

      <div className="logo">
        <Link to={'/'}>
          <img src={logo} alt="" />
        </Link>
      </div>

    </header>
  )
}

export default Header