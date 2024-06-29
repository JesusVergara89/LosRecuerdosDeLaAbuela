import React, { useState } from 'react'
import '../styles/Header.css'
import logo from '../images/fodoabuela1.png'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import Menu from './Menu';
import { useDispatch, useSelector } from 'react-redux';
import { setBasketProductValue } from '../store/slices/basketproducts.slice';
import useCallBasket from '../hooks/useCallBasket';
import { setCallingBasketProductValue } from '../store/slices/callingbasket.slice';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const Header = () => {

  const adminUID = import.meta.env.VITE_FIREBASE_APP_ADMIN_UID;
  const adminUID1 = import.meta.env.VITE_FIREBASE_APP_ADMIN_UID1;
  const [burger_class, setBurger_class] = useState('burger-bar unclicked')
  const [menu_class, setMenu_class] = useState('menu hidden')
  const [isMenuClickked, setIsMenuClickked] = useState(false)
  const [thisUser] = useAuthState(auth)
  const quantityProducts = useSelector(state => state.basketProducts)
  const dispatch = useDispatch()
  const dispatch1 = useDispatch()
  const setQuantityofProducts = (value) => dispatch(setBasketProductValue(value));
  const callingBasketProducts = (value) => dispatch1(setCallingBasketProductValue(value));

  const { products, allBasket } = useCallBasket(thisUser)

  callingBasketProducts(products.map(product => ({
    ...product,
    createdAt: product.createdAt ? product.createdAt.seconds * 1000 + product.createdAt.nanoseconds / 1000000 : null,
  })))

  const navigate = useNavigate()

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

  const toBasket = () => {
    navigate('/basket')
  }

  const deleteDocAsync = async (id) => {
    const docRef = doc(db, 'Carrito', id);
    try {
      await deleteDoc(docRef);
    } catch (error) {
      console.log(error);
      toast('Error al borrar el producto', { type: "error" });
    }
  };

  const updateProduct = async (id) => {
    const productsRef = doc(db, 'Products', id);
      try {
        await updateDoc(productsRef, { onShop_quantity: 0 });
      } catch (error) {
        console.log(error);
      }
  }

  const nowInMillis = Date.now();
  const twentyFiveMinutesInMillis = 1 * 60 * 1000;

  if (thisUser !== null) {
    allBasket.forEach(product => {
      const productCreatedAtInMillis = product.createdAt.seconds * 1000 + product.createdAt.nanoseconds / 1000000;
      if ((nowInMillis - productCreatedAtInMillis) > twentyFiveMinutesInMillis) {
        updateProduct(product.productID);
        deleteDocAsync(product.id);
      }
    });
  }
  //console.log(allBasket)

  return (
    <header>

      {
        thisUser &&
        <div className="header-user-login">
          <h4>{thisUser.displayName === null ? `Welcome ${thisUser.email}` : `Welcome ${thisUser.displayName}`}</h4>
          <button onClick={() => { signOut(auth); setQuantityofProducts(0) }}>Salir</button>
        </div>
      }

      <div className="logo">
        <Link to={'/'}>
          <img src={logo} alt="" />
        </Link>
      </div>

      <div onClick={toBasket} className="header-basket">
        <i className='bx bx-cart'></i>
        <div className='header-basket-quantity'>{quantityProducts}</div>
      </div>

      <Menu burger_class={burger_class} updatedMenu={updatedMenu} thisUser={thisUser} adminUID1={adminUID1} adminUID={adminUID} menu_class={menu_class} />

    </header>
  )
}

export default Header