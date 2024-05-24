import React, { useState, useEffect } from 'react';
import './Edit.css';
import { Timestamp, doc, updateDoc } from 'firebase/firestore';
import useProducts from '../hooks/useProducts';
import { db } from '../firebaseConfig';
import { toast } from 'react-toastify';

const Edit = ({ product, functionEditOrDelete }) => {

    const { categories } = useProducts();

    const [select, setSelect] = useState(product.Category);
    const [formData, setFormData] = useState({
        Category: product.Category || '',
        createdAt: Timestamp.now().toDate(),
        description: product.description || '',
        discount_percentage: product.discount_percentage || '',
        image: product.image || '',
        likes: product.likes || '',
        price: product.price || '',
        quantity: product.quantity || ''
    });

    useEffect(() => {
        setSelect(product.Category);
        setFormData({
            Category: product.Category,
            createdAt: Timestamp.now().toDate(),
            description: product.description,
            discount_percentage: product.discount_percentage,
            image: product.image,
            likes: product.likes,
            price: product.price,
            quantity: product.quantity
        });
    }, [product]);

    const handleChange = (event) => {
        const category = event.target.value;
        setSelect(category);
        setFormData({ ...formData, Category: category });
    };

    const handleChange1 = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePublish = async () => {
        const updatedData = { ...formData };
        try {
            for (const key in updatedData) {
                if (key !== 'image' && updatedData[key] === '') {
                    updatedData[key] = product[key];
                }
            }
            const updateData = {
                Category: updatedData.Category,
                createdAt: Timestamp.now().toDate(),
                description: updatedData.description,
                discount_percentage: updatedData.discount_percentage,
                image: product.image,
                likes: updatedData.likes,
                price: updatedData.price,
                quantity: updatedData.quantity
            };
            const docRef = doc(db, 'Products', product.id);
            await updateDoc(docRef, updateData);
            toast('Producto actualizado con exito', { type: 'success' });
            setFormData({
                Category: '',
                createdAt: '',
                description: '',
                discount_percentage: '',
                image: '',
                likes: '',
                price: '',
                quantity: ''
            });
            functionEditOrDelete()
        }
        catch (error) {
            console.log(error);
            toast('Error al actualizar el producto', { type: "error" });
        }

    };

    return (
        <div className='edit'>
            <button className='edit-back' onClick={functionEditOrDelete}>No editar</button>
            <div className="createdproduct-add-product">
                <select value={select} onChange={handleChange}>
                    <option value="" disabled>Selecciona una categoría</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                    ))}
                </select>
                <label>Descripción</label>
                <textarea
                    placeholder='Descripción'
                    name='description'
                    className='description'
                    value={formData.description}
                    onChange={handleChange1}
                />
                <label>Descuento</label>
                <input
                    placeholder='Descuento'
                    name='discount_percentage'
                    type="text"
                    className='discount'
                    value={formData.discount_percentage}
                    onChange={handleChange1}
                />
                <label>Precio</label>
                <input
                    placeholder='Precio'
                    name='price'
                    type="text"
                    className='price'
                    value={formData.price}
                    onChange={handleChange1}
                />
                <label>Cantidad</label>
                <input
                    placeholder='Cantidad'
                    name='quantity'
                    type="text"
                    className='quantity'
                    value={formData.quantity}
                    onChange={handleChange1}
                />
                <button onClick={handlePublish} className="create">Update product</button>
            </div>
        </div>
    );
};

export default Edit;
