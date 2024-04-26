import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/Singleproduct.css'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import Mapsingleprodcut from './Mapsingleprodcut'
import Allproducts from './Allproducts'

const Singleproduct = () => {

    const { id } = useParams()

    const [product, setProduct] = useState(null)

    useEffect(() => {
        const documentREF = doc(db, "Products", id)
        onSnapshot(documentREF, (snapshot) => {
            setProduct({ ...snapshot.data(), id: snapshot.id })
        })
    }, [])

    let stopLooping = false

    return (
        <>
            {id && product && <div className='Singleproduct'>

                <Mapsingleprodcut product={product} stopLooping={stopLooping} />

                <h2>Productos que también te puden interesar</h2>

                <Allproducts idProduct={id} />

            </div>}
        </>
    )
}

export default Singleproduct