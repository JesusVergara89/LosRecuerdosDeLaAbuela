import React, { useEffect, useState } from 'react'
import '../styles/Cardbasket.css'
import Deleteproductbasket from './Deleteproductbasket'
import { doc, increment, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { toast } from 'react-toastify';

const Cardbasket = ({ product }) => {

    const [select, setSelect] = useState('');
    const [select1, setSelect1] = useState('');
    const [counter, setCounter] = useState(0);
    const [thisproduct, setThisproduct] = useState()

    const handleChange = (event) => {
        const size = event.target.value;
        setSelect(size);
    };

    const handleChange1 = (event) => {
        const color = event.target.value;
        setSelect1(color);
    };

    const handleAddorsubs = (data) => {
        if (data === 0) {
            if (counter > 0) {
                setCounter(counter - 1);
            }
        } else {
            if (counter < parseInt(product.quantity)) {
                if (product.colors.length <= 0 || product.sizes.length <= 0) {
                    setCounter(counter + 1);
                } else if (product.colors.length > 0 && product.sizes.length > 0 && select !== '' && select1 !== '') {
                    setCounter(counter + 1);
                }
            } else if (counter === parseInt(product.quantity)) {
                toast('Stock máximo alcanzado', { type: 'warning' });
            }
        }
    };

    useEffect(() => {
        const documentRef = doc(db, "Products", product.productID);
        onSnapshot(documentRef, (snapshot) => {
            setThisproduct(snapshot.data());
        });
    }, [counter]);

    const updateFirebaseCollections = async (num) => {
        if (num === 1) {
            if (product.colors.length <= 0 || product.sizes.length <= 0) {
                try {
                    // Actualizar Carrito
                    const carritoRef = doc(db, 'Carrito', product.id);
                    let aux = product.tallas === '' ? select : product.tallas.concat(',', select)
                    let aux2 = product.colores === '' ? select1 : product.colores.concat(',', select1)
                    await updateDoc(carritoRef, { onShop: increment(1), tallas: aux, colores: aux2 });

                    // Actualizar Products
                    const productsRef = doc(db, 'Products', product.productID);
                    await updateDoc(productsRef, { onShop_quantity: thisproduct.onShop_quantity + 1 });

                    //toast('Actualización exitosa', { type: 'success' });
                    setSelect('')
                    setSelect1('')

                } catch (error) {
                    toast('Error actualizando el carrito', { type: 'error' });
                    console.log(error)
                }
            } else if (product.colors.length > 0 && product.sizes.length > 0 && select !== '' && select1 !== '') {
                try {
                    // Actualizar Carrito
                    const carritoRef = doc(db, 'Carrito', product.id);
                    let aux = product.tallas === '' ? select : product.tallas.concat(',', select)
                    let aux2 = product.colores === '' ? select1 : product.colores.concat(',', select1)
                    await updateDoc(carritoRef, { onShop: increment(1), tallas: aux, colores: aux2 });

                    // Actualizar Products
                    const productsRef = doc(db, 'Products', product.productID);
                    await updateDoc(productsRef, { onShop_quantity: thisproduct.onShop_quantity + 1 });

                   //toast('Actualización exitosa', { type: 'success' });
                    setSelect('')
                    setSelect1('')

                } catch (error) {
                    toast('Error actualizando carrito', { type: 'error' });
                    console.log(error)
                }
            } else {
                toast('Tienes que seleccionar tallas y colores para agregar productos', { type: 'warning' });
            }
        } else if (num === 0) {
            try {
                // Actualizar Carrito
                const carritoRef = doc(db, 'Carrito', product.id);
                let aux = product.tallas.split(',')
                aux.pop()
                let nuevaAux = aux.join(',')

                let aux1 = product.colores.split(',')
                aux1.pop()
                let nuevaAux1 = aux1.join(',')
                await updateDoc(carritoRef, { onShop: product.onShop - 1, tallas: nuevaAux, colores: nuevaAux1 });

                // Actualizar Products
                const productsRef = doc(db, 'Products', product.productID);
                await updateDoc(productsRef, { onShop_quantity: thisproduct.onShop_quantity - 1 });

                //toast('Actualización exitosa', { type: 'success' });

            } catch (error) {
                toast('Error actualizando carrito', { type: 'error' });
                console.log(error)
            }
        }
    };

    return (
        <div className='Cardbasket'>
            <div className="cardbasket-container-img">
                <img src={product.photo} alt={product.name} />
            </div>

            <div className="cardbasket-price">
                <h6>{product.onShop === 0 ? `$ ${product.price * counter}` : `$ ${product.price * product.onShop}`}</h6>
            </div>

            <div className="cardbasket-quantity">
                <button onClick={() => { handleAddorsubs(0); parseInt(product.onShop) === 0 ? '' : updateFirebaseCollections(0) }}><i className='bx bx-minus'></i></button>
                <div className="cardbasket-counter">
                    {product.onShop == 0 ? counter : product.onShop}
                </div>
                <button onClick={() => {
                    handleAddorsubs(1);
                    thisproduct.onShop_quantity === parseInt(product.quantity)
                        ?
                        ''
                        :
                        updateFirebaseCollections(1)
                }}><i className='bx bx-plus'></i></button>
            </div>

            {/**
             * From here all the html and jsx is in position absolute
             */}

            {product.colors.length === 0 || product.sizes.length === 0 || product.tallas === '' || product.colores === '' ? '' :
                <div className="tallas_colores">
                    <h4 className="tallas"><span>Tus tallas: </span>{product.tallas}</h4>
                    <h4 className="colores"><span>Tus Colores: </span>{product.colores}</h4>
                </div>
            }

            {product.colors.length === 0 ?
                ''
                :
                <div className='basket-select-color'>
                    <select value={select1} onChange={handleChange1}>
                        <option value="" disabled>Selecciona un color</option>
                        {product.colors.map((category) => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            }

            {product.sizes.length === 0 ?
                ''
                :
                <div className='basket-select-size'>
                    <select value={select} onChange={handleChange}>
                        <option value="" disabled>Selecciona una talla</option>
                        {product.sizes.map((category) => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            }

            <div className="cardbasket-date">
                <Deleteproductbasket thisproduct={thisproduct} product={product} />
            </div>
        </div>
    );
}

export default Cardbasket;
