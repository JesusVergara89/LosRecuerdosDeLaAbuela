import React, { useEffect, useState } from 'react'
import Mapsingleprodcut from './Mapsingleprodcut'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import '../styles/Allproducts.css'

const Allproducts = ({ idProduct }) => {

    const [products, setProducts] = useState([])
    const [itemp, setItemp] = useState([])

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

    useEffect(() => {
        if (idProduct !== null && products.length > 0) {
            const filteredProducts = products.filter(data => data.id !== idProduct)
            setItemp(filteredProducts)
        } else {
            setItemp(products)
        }
    }, [idProduct, products])

    let stopLooping = true

    return (
        <div className='Allproducts'>
            {itemp && itemp.map((product, i) => (
                <Mapsingleprodcut product={product} stopLooping={stopLooping} key={i} />
            ))}
        </div>
    )
}

export default Allproducts
