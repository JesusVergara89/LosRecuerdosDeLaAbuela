import React, { useState } from 'react'
import '../styles/Header.css'
import logo from '../images/logoabuela.png'
import { Link } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

const Header = () => {

  const [burger_class, setBurger_class] = useState('burger-bar unclicked')
  const [menu_class, setMenu_class] = useState('menu hidden')
  const [isMenuClickked, setIsMenuClickked] = useState(false)
  const [thisUser] = useAuthState(auth)

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

  console.log(thisUser)

  return (
    <header>

      {
        thisUser &&
        <div className="header-user-login">
          <h4>{thisUser.displayName !== null ? `Welcome ${thisUser.displayName}` : `Welcome ${thisUser.email}`}</h4>
          <button onClick={() => { signOut(auth) }}>Salir</button>
        </div>
      }

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
          <li onClick={updatedMenu}><Link to="/">Home</Link></li>
          <li onClick={updatedMenu}><Link to="/carrito">Carrito</Link></li>
          <li onClick={updatedMenu}><Link to="/ropa">Ropa</Link></li>
          <li onClick={updatedMenu}><Link to="/juguetes">Juguetes</Link></li>
          <li onClick={updatedMenu}><Link to="/login">Login</Link></li>
          <li onClick={updatedMenu}><Link to="/register">Registrase</Link></li>
        </ul>
      </div>


    </header>
  )
}

export default Header