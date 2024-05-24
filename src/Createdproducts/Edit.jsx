import React, { useState, useEffect } from 'react';
import './Edit.css';
import { Timestamp, doc, updateDoc } from 'firebase/firestore';
import useProducts from '../hooks/useProducts';
import { db } from '../firebaseConfig';
import { toast } from 'react-toastify';
import useColors from '../hooks/useColors';
import useSizes from '../hooks/useSizes';

const Edit = ({ product, functionEditOrDelete }) => {

    const { categories } = useProducts();
    const { colors } = useColors();
    const { sizes } = useSizes();

    const [select, setSelect] = useState(product.Category);
    const [selectcolors, setSelectcolors] = useState([]);
    const [selectsizes, setSelectsizes] = useState([]);
    const [formData, setFormData] = useState({
        Category: product.Category || '',
        createdAt: Timestamp.now().toDate(),
        description: product.description || '',
        discount_percentage: product.discount_percentage || '',
        image: product.image || '',
        likes: product.likes || '',
        price: product.price || '',
        quantity: product.quantity || '',
        colors: product.colors || '',
        sizes: product.sizes || ''
    });

    useEffect(() => {
        setSelect(product.Category);
        setSelectcolors(product.colors)
        setSelectsizes(product.sizes)
        setFormData({
            Category: product.Category,
            createdAt: Timestamp.now().toDate(),
            description: product.description,
            discount_percentage: product.discount_percentage,
            image: product.image,
            likes: product.likes,
            price: product.price,
            quantity: product.quantity,
            colors: product.colors,
            sizes: product.sizes 
        });
    }, [product]);

    const handleChange = (event) => {
        const category = event.target.value;
        setSelect(category);
        setFormData({ ...formData, Category: category });
    };

    const handleChangeColor = (event) => {
        const color = event.target.value;
        setSelectcolors([...selectcolors, color]);
        setFormData(prevFormData => ({
            ...prevFormData,
            colors: [...prevFormData.colors, color]
        }));
    };

    const handleChangeSize = (event) => {
        const size = event.target.value;
        setSelectsizes([...selectsizes, size]);
        setFormData(prevFormData => ({
            ...prevFormData,
            sizes: [...prevFormData.sizes, size]
        }));
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
                quantity: updatedData.quantity,
                colors: updateData.colors,
                sizes: updatedData.sizes
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
                quantity: '',
                colors: [],
                sizes: []
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
                <select value="" onChange={handleChangeColor}>
                    <option value="" disabled>Selecciona un color</option>
                    {colors.map((color) => (
                        <option key={color} value={color}>
                            {color.charAt(0).toUpperCase() + color.slice(1)}
                        </option>
                    ))}
                </select>
                <select value="" onChange={handleChangeSize}>
                    <option value="" disabled>Selecciona una talla</option>
                    {sizes.map((size) => (
                        <option key={size} value={size}>
                            {size.charAt(0).toUpperCase() + size.slice(1)}
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

                <div className="edit-current-data">
                    <label>{`${product.colors.length === 0 ? '' : 'Colores:'}`}</label>
                    {product.colors.length !== 0 ?
                        <div className="edit-current-data-colors">
                            {
                                formData.colors.map((color, i) => (
                                    <h5 className='edit-colors' key={i}>{color}</h5>
                                ))
                            }
                        </div>
                        :
                        ''
                    }
                    <label>{`${product.colors.length === 0 ? '' : 'Sizes:'}`}</label>
                    {product.sizes.length !== 0 ?
                        <div className="edit-current-data-colors">
                            {
                                formData.sizes.map((size, i) => (
                                    <h5 className='edit-colors' key={i}>{size}</h5>
                                ))
                            }
                        </div>
                        :
                        ''
                    }
                </div>
                <button onClick={handlePublish} className="create">Update product</button>
            </div>
        </div>
    );
};

export default Edit;
