import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/Selectcategory.css'
import useProducts from '../hooks/useProducts';

const Selectcategory = () => {
    const [select, setSelect] = useState('');
    const navigate = useNavigate()
    const { categories } = useProducts()
    const handleChange = (event) => {
        const category = event.target.value;
        setSelect(category);
        navigate(`/categorycomponent/${category}`)
        setSelect('');
    };

    return (
        <select className='Selectcategory' value={select} onChange={handleChange}>
            <option value="" disabled>Selecciona una categoría</option>
            {categories.map((category) => (
                <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
            ))}
        </select>
    )
}

export default Selectcategory