import React, { useState } from 'react'
import '../styles/Header.css'
import logo from '../images/logoabuela.png'
import { Link } from 'react-router-dom'

const Header = () => {

  const [burger_class, setBurger_class] = useState('burger-bar unclicked')
  const [menu_class, setMenu_class] = useState('menu hidden')
  const [isMenuClickked, setIsMenuClickked] = useState(false)

  const updatedMenu = () => {
    if (!isMenuClickked) {
      setBurger_class('burger-bar clicked')
      setMenu_class('menu visible')
    } else {
      setBurger_class('burger-bar unclicked')
      setMenu_class('menu hidden')
    }
    setIsMenuClickked(!isMenuClickked)
  }

  return (
    <header>

      <div className="logo">
        <Link to={'/'}>
          <img src={logo} alt="" />
        </Link>
      </div>


      <div className="burger-menu" onClick={updatedMenu}>
        <div className={burger_class} ></div>
        <div className={burger_class} ></div>
        <div className={burger_class} ></div>
      </div>

      <div className={menu_class}>
        <ul className="custom-list">
          <li><Link to="/ropa">Ropa</Link></li>
          <li><Link to="/juguetes">Juguetes</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </div>


    </header>
  )
}

export default Header