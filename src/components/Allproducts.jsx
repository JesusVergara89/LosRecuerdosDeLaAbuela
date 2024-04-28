import React, { useEffect, useState } from 'react'
import Mapsingleprodcut from './Mapsingleprodcut'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import '../styles/Allproducts.css'
import { useSelector } from 'react-redux'

const Allproducts = ({ idProduct }) => {

    const [products, setProducts] = useState([])
    const [itemp, setItemp] = useState([])

    const productID = useSelector(state => state.product)

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
    }, [productID])

    useEffect(() => {
        if (idProduct !== null && products.length > 0) {
            const filteredProducts = products.filter(data => data.id !== idProduct)
            setItemp(filteredProducts)
        } else {
            setItemp(products)
        }
    }, [idProduct, products,productID])



    return (
        <div className='Allproducts'>
            {itemp && itemp.map((product, i) => (
                <Mapsingleprodcut product={product} key={i} />
            ))}
        </div>
    )
}

export default Allproducts
