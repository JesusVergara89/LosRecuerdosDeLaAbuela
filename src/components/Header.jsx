import React from 'react'
import '../styles/Header.css'
import logo from '../images/logoabuela.png'

const Header = () => {
  return (
   <header>

    <div className="logo">
        <img src={logo} alt="" />
    </div>

   </header>
  )
}

export default Header