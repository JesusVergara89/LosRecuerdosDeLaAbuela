import React, { useState } from 'react';
import './Createdproduct.css';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { auth, db, storage } from '../firebaseConfig';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import useProducts from '../hooks/useProducts';
import { useNavigate } from 'react-router-dom';
import useColors from '../hooks/useColors';
import useSizes from '../hooks/useSizes';

const Createdproduct = () => {
    const adminUID = import.meta.env.VITE_FIREBASE_APP_ADMIN_UID;
    const navigate = useNavigate();
    const [logUser] = useAuthState(auth);
    const [select, setSelect] = useState('');
    const [selectcolors, setSelectcolors] = useState([]);
    const [selectsizes, setSelectsizes] = useState([]);
    const [progress, setProgress] = useState(0);
    const [formData, setFormData] = useState({
        Category: '',
        createdAt: Timestamp.now().toDate(),
        description: '',
        discount_percentage: '',
        image: '',
        likes: [],
        price: '',
        quantity: '',
        colors: [],
        sizes: []
    });

    const { categories } = useProducts();
    const { colors } = useColors();
    const { sizes } = useSizes();

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

    const handleChangeImage = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handlePublish = () => {
        if (!formData.Category || !formData.description || !formData.image || !formData.price || !formData.quantity) {
            alert('Por favor completar los campos requeridos');
            return;
        }
        const storageRef = ref(storage, `/images/${Date.now()}${formData.image.name}`);
        const uploadImage = uploadBytesResumable(storageRef, formData.image);
        uploadImage.on("state_changed",
            (snapshot) => {
                const progressPercent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progressPercent);
            },
            (err) => {
                console.log(err);
            },
            () => {
                setFormData({
                    Category: '',
                    description: '',
                    discount_percentage: '',
                    image: '',
                    likes: [],
                    price: '',
                    quantity: '',
                    colors: [],
                    sizes: []
                });
                getDownloadURL(uploadImage.snapshot.ref)
                    .then((url) => {
                        const productref = collection(db, 'Products');
                        addDoc(productref, {
                            Category: formData.Category,
                            createdAt: Timestamp.now().toDate(),
                            description: formData.description,
                            discount_percentage: formData.discount_percentage,
                            image: url,
                            likes: formData.likes,
                            price: formData.price,
                            quantity: formData.quantity,
                            colors: formData.colors,
                            sizes: formData.sizes
                        })
                            .then(() => {
                                toast("Producto agregado correctamente", { type: "success" });
                                setProgress(0);
                                navigate('/');
                            })
                            .catch(e => {
                                toast("Error agregando el producto", { type: "error" });
                            });
                    });
            }
        );
    };

    return (
        logUser && logUser.uid === adminUID ? (
            <div className="createdproduct">
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
                    <label>Imagen</label>
                    <input
                        type="file"
                        className='image'
                        accept='/*'
                        onChange={handleChangeImage}
                    />

                    {progress === 0 ? null : (
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped" style={{ width: `${progress}%` }}>
                                <h5>{`Subiendo imagen ${progress}%`}</h5>
                            </div>
                        </div>
                    )}
                    <button onClick={handlePublish} className="create">Create product</button>
                </div>
                <div className="product-selection">
                    <p>Seleccionaste: {select}</p>
                    <div className='product-selection-colors'>Colores seleccionados: {selectcolors.join(', ')}</div>
                    <div className='product-selection-size'>Tallas seleccionadas: {selectsizes.join(', ')}</div>
                </div>
            </div>
        ) : (
            <p className='Dont-allow'>No tienes permiso para crear productos.</p>
        )
    );
};

export default Createdproduct;
