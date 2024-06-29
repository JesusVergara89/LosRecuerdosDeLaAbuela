import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { db } from '../firebaseConfig';
import { toast } from 'react-toastify';

const DeleteProductBasket = ({ product, thisproduct }) => {

    const deleteDocAsync = async () => {
        const docRef = doc(db, 'Carrito', product.id);
        try {
            await deleteDoc(docRef);
        } catch (error) {
            console.log(error);
            toast('Error al borrar el producto', { type: "error" });
        }
    };

    const updateProduct = async () => {
        const productsRef = doc(db, 'Products', product.productID);
        if (product.onShop === thisproduct.onShop_quantity) {
            try {
                await updateDoc(productsRef, { onShop_quantity: 0 });
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                await updateDoc(productsRef, { onShop_quantity: thisproduct.onShop_quantity - 1 });
            } catch (error) {
                console.log(error);
            }
        }
    }

    return <div onClick={() => { deleteDocAsync(); updateProduct() }} className='delete-product-basket'><i className='bx bxs-trash'></i></div>;
};

export default DeleteProductBasket;
