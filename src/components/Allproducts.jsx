import React, { useEffect, useState } from 'react'
import Mapsingleprodcut from './Mapsingleprodcut'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import '../styles/Allproducts.css'

const Allproducts = () => {

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
        <div className='Allproducts'>
            {products && products.map((product, i) => (
                <Mapsingleprodcut product={product} key={i}  />
            ))
            }
        </div>
    )
}

export default Allproducts