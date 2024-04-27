import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/Singleproduct.css'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import Allproducts from './Allproducts'
import SIngleproductcard from './SIngleproductcard'
import { useSelector } from 'react-redux'

const Singleproduct = () => {

    const { id } = useParams()

    const [product, setProduct] = useState(null)

    const productID = useSelector(state => state.product)

    useEffect(() => {
        if (productID !== '') {
            const documentREF = doc(db, "Products", productID)
            onSnapshot(documentREF, (snapshot) => {
                setProduct({ ...snapshot.data(), id: snapshot.id })
            })
        } else {
            const documentREF = doc(db, "Products", id)
            onSnapshot(documentREF, (snapshot) => {
                setProduct({ ...snapshot.data(), id: snapshot.id })
            })
        }
    }, [productID])


    let stopPropagation = false


    return (
        <>
            {id && product && <div className='Singleproduct'>

                <SIngleproductcard product={product} />

                <h2>Productos que también te puden interesar</h2>

                <Allproducts idProduct={productID === '' ? id : productID} stopPropagation={stopPropagation} />

            </div>}
        </>
    )
}

export default Singleproduct