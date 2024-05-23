import React, { useEffect, useState } from 'react'
import './Editproducts.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebaseConfig';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

const Editproducts = () => {

    const [logUser] = useAuthState(auth);
    const adminUID = import.meta.env.VITE_FIREBASE_APP_ADMIN_UID;

    const [products, setProducts] = useState([])

    useEffect(() => {
        const productREF = collection(db, 'Products')
        const q = query(productREF, orderBy('createdAt', 'desc'))
        onSnapshot(q, (snapshot) => {
            const Products = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setProducts(Products)
        })
    }, [])

    console.log(products)
    
    return (
        logUser && logUser.uid === adminUID  ? (
            <div className="Editproducts">
                 this is edit products
            </div>
        ) : (
            <p className='Dont-allow'>No tienes permiso para editar productos.</p>
        )
    );
}

export default Editproducts