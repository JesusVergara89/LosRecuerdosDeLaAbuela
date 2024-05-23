import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Menu.css'
import Selectcategory from './Selectcategory'

const Menu = ({ burger_class, updatedMenu, thisUser, adminUID, menu_class }) => {
    
    return (
        <>
            <div className="burger-menu" onClick={updatedMenu}>
                <div className={burger_class} ></div>
                <div className={burger_class} ></div>
                <div className={burger_class} ></div>
            </div>

            <div className={menu_class}>
                <ul className="custom-list">
                    <li onClick={updatedMenu}><Link to="/">Home</Link></li>                    
                    <li onClick={updatedMenu}><Link to="/carrito">Carrito</Link></li>
                    <li onClick={updatedMenu}><Link to="/login">Login</Link></li>
                    <li onClick={updatedMenu}><Link to="/register">Registrase</Link></li>
                    {thisUser && thisUser.uid === adminUID ? (
                        <li onClick={updatedMenu}><Link to="/create">New product</Link></li>
                    ) : null}
                    {thisUser && thisUser.uid === adminUID ? (
                        <li onClick={updatedMenu}><Link to="/edit">Edit product</Link></li>
                    ) : null}
                    <label >Seleccionar categoría</label>
                    <Selectcategory/>
                </ul>
            </div>
        </>
    )
}

export default Menu