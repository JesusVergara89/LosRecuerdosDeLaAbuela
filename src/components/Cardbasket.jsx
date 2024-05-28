import React, { useEffect, useState } from 'react'
import '../styles/Cardbasket.css'
import Deleteproductbasket from './Deleteproductbasket'

const Cardbasket = ({ product, pushingPrices, sumOfTheProces }) => {

    const [counter, setCounter] = useState(0)

    const handleAddorsubs = (data) => {
        if (data === 0 && counter > 0) {
            setCounter(counter - 1)
        } else if (data === 0 && counter === 0) {
            setCounter(0)
        } else {
            setCounter(counter + 1)
        }
    }

    useEffect(() => {
        if (sumOfTheProces.length === 0) {
            setCounter(0);
        }
    }, [sumOfTheProces]);

    return (
        <div className='Cardbasket'>
            <div className="cardbasket-container-img">
                <img src={product.photo} />
            </div>

            <div className="cardbasket-price">
                <h6>{`$ ${counter === 0 ? product.price * 0 : product.price * counter}`}</h6>
            </div>

            <div className="cardbasket-quantity">
                <button onClick={() => { handleAddorsubs(0); pushingPrices(product.price, 0) }}><i className='bx bx-minus'></i></button>
                <div className="cardbasket-counter">
                    {counter}
                </div>
                <button onClick={() => { handleAddorsubs(1); pushingPrices(product.price, 1) }}><i className='bx bx-plus'></i></button>
            </div>

            <div className="cardbasket-date">
                <Deleteproductbasket pushingPrices={pushingPrices} product={product} />
            </div>
        </div>

    )
}

export default Cardbasket