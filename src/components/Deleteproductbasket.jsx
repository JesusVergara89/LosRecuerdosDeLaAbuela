import { deleteDoc, doc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { db } from '../firebaseConfig';
import { toast } from 'react-toastify';

const DeleteProductBasket = ({ product }) => {

    const hours48InMillis = 48 * 60 * 60 * 1000;

    const deleteDocAsync = async () => {
        try {
            const docRef = doc(db, 'Carrito', product.id);
            await deleteDoc(docRef);
        } catch (error) {
            console.log(error);
            toast('Error al borrar el producto', { type: "error" });
        }
    };

    useEffect(() => {
        const now = Date.now();
        if (product && product.createdAt) {
            if ((now - product.createdAt) > hours48InMillis) {
                deleteDocAsync();
            }
        }
    }, [product]);

    return <div onClick={deleteDocAsync} className='delete-product-basket'><i className='bx bxs-trash'></i></div>;
};

export default DeleteProductBasket;
