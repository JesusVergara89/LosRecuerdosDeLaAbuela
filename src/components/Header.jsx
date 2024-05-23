import React, { useState } from 'react'
import '../styles/Header.css'
import logo from '../images/logoabuela.png'
import { Link } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import Menu from './Menu';

const Header = () => {

  const adminUID = import.meta.env.VITE_FIREBASE_APP_ADMIN_UID;
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

  //console.log(thisUser)

  return (
    <header>
      {
        thisUser &&
        <div className="header-user-login">
          <h4>{thisUser.displayName === null ? `Welcome ${thisUser.email}` : `Welcome ${thisUser.displayName}`}</h4>
          <button onClick={() => { signOut(auth) }}>Salir</button>
        </div>
      }

      <div className="logo">
        <Link to={'/'}>
          <img src={logo} alt="" />
        </Link>
      </div>

      <Menu burger_class={burger_class} updatedMenu={updatedMenu} thisUser={thisUser} adminUID={adminUID} menu_class={menu_class}/>

    </header>
  )
}

export default Header