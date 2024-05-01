import React, { useEffect, useState } from 'react'
import Mapsingleprodcut from './Mapsingleprodcut'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import '../styles/Allproducts.css'
import { useSelector } from 'react-redux'
import Searchingproducts from './Searchingproducts'

const Allproducts = ({ idProduct }) => {

    const [products, setProducts] = useState([])
    const [itemp, setItemp] = useState([])

    const [filtro, setFiltro] = useState('');
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);


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
    }, [idProduct, products, productID])

    const handleInputChange = (event) => {
        const valor = event.target.value.toLowerCase();
        setFiltro(valor);
        const resultados = itemp.filter(product =>
            product.Category.toLowerCase().includes(valor) || product.description.toLowerCase().includes(valor)
        );
        setUsuariosFiltrados(resultados);
    };

    return (
        <div className='Allproducts'>

            <Searchingproducts handleInputChange={handleInputChange} filtro={filtro} />

            <div className="Allproductlist">
                {filtro === '' || usuariosFiltrados.length === 0 ?

                    products.map((product, i) => (
                        <Mapsingleprodcut product={product} key={i} />
                    ))
                    :
                    usuariosFiltrados.map((product, i) => (
                        <Mapsingleprodcut product={product} key={i} />
                    ))
                }
            </div>

        </div>
    )
}

export default Allproducts
