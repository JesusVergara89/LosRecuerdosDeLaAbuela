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
                    <li onClick={updatedMenu}><Link to="/basket">Carrito</Link></li>

                    {
                        thisUser !== null ? (
                            null
                        )
                            :
                             <li onClick={updatedMenu}><Link to="/login">Login</Link></li>
                    }

                    {
                        thisUser !== null ? (
                            null
                        )
                            :
                            <li onClick={updatedMenu}><Link to="/register">Registrase</Link></li>
                    }

                    {
                        thisUser && thisUser.uid === adminUID ? (
                            <li className='this-li' onClick={updatedMenu}><Link to="/create">Nuevo producto</Link></li>
                        )
                            :
                            null
                    }

                    {
                        thisUser && thisUser.uid === adminUID ? (
                            <li className='this-li' onClick={updatedMenu}><Link to="/edit">Editar producto</Link></li>
                        )
                            :
                            null
                    }

                    <li><i className='bx bx-minus'></i></li>
                    <label >Categorias de productos</label>
                    <Selectcategory />
                </ul>
            </div>
        </>
    )
}

export default Menu