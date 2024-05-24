import React from 'react'
import '../styles/Mapsingleprodcut.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setIdValue } from '../store/slices/product.slice'
import Card from './Card'

const Mapsingleprodcut = ({ product }) => {

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const setIDValue = (value) => dispatch(setIdValue(value));

    const handleClick = () => {
        navigate(`/singleproduct/${product.id}`, { replace: true })
    }

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <div className='Mapsingleprodcut'>
            <Card setIDValue={setIDValue} product={product} handleScrollToTop={handleScrollToTop} handleClick={handleClick} />
        </div>
    )
}

export default Mapsingleprodcut