import React, { useEffect, useState } from 'react'
import '../styles/Basket.css'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { auth, db } from '../firebaseConfig'
import Cardbasket from './Cardbasket'
import { useAuthState } from 'react-firebase-hooks/auth'

const Basket = () => {
    const [products, setProducts] = useState([])
    const [user] = useAuthState(auth)
    useEffect(() => {
        const productREF = collection(db, 'Carrito')
        const q = query(productREF, orderBy('createdAt', 'desc'))
        onSnapshot(q, (snapshot) => {
            const Products = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setProducts(Products.filter(product => product.idBuyer === user.uid))
        })
    }, [])

    return (
        <div className='Basket'>
            <div className="basket-with-products">
                {
                    products && products.map((product, i) => (
                        <Cardbasket key={i} product={product} />
                    ))
                }
            </div>
            
        </div>
    )
}

export default Basket