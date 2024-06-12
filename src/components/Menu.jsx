import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menu.css';
import Selectcategory from './Selectcategory';

const Menu = ({ burger_class, updatedMenu, thisUser, adminUID, menu_class, adminUID1 }) => {
    const isAdmin = thisUser && (thisUser.uid === adminUID || thisUser.uid === adminUID1);

    return (
        <>
            <div className="burger-menu" onClick={updatedMenu}>
                <div className={burger_class}></div>
                <div className={burger_class}></div>
                <div className={burger_class}></div>
            </div>

            <div className={menu_class}>
                <ul className="custom-list">
                    <li onClick={updatedMenu}><Link to="/">Home</Link></li>
                    <li onClick={updatedMenu}><Link to="/basket">Carrito</Link></li>

                    {thisUser === null && (
                        <>
                            <li onClick={updatedMenu}><Link to="/login">Login</Link></li>
                            <li onClick={updatedMenu}><Link to="/register">Registrarse</Link></li>
                        </>
                    )}

                    {isAdmin && (
                        <>
                            <li className='this-li' onClick={updatedMenu}><Link to="/create"><i className='bx bx-plus'></i></Link></li>
                            <li className='this-li' onClick={updatedMenu}><Link to="/edit"><i className='bx bx-edit'></i></Link></li>
                        </>
                    )}

                    <label>Categorias de productos</label>
                    <Selectcategory />
                </ul>
            </div>
        </>
    );
}

export default Menu;
