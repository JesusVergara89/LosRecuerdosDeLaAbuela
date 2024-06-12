import React, { useEffect, useState } from 'react'
import './Editproducts.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebaseConfig';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import CardEdit from './CardEdit';

const Editproducts = () => {

    const [logUser] = useAuthState(auth);
    const adminUID = import.meta.env.VITE_FIREBASE_APP_ADMIN_UID;
    const adminUID1 = import.meta.env.VITE_FIREBASE_APP_ADMIN_UID1;

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
    
    return (
        logUser && products && logUser.uid === adminUID  || logUser.uid === adminUID1 ? (
            <div className="Editproducts">
                {
                    products.map((product, i) => (
                            <CardEdit key={i} product={product} />        
                    ))
                }
            </div>
        ) : (
            <p className='Dont-allow'>No tienes permiso para editar productos.</p>
        )
    );
}

export default Editproducts