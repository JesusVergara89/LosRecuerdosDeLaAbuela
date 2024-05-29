import React, { useEffect, useState } from 'react'
import '../styles/Cardbasket.css'
import Deleteproductbasket from './Deleteproductbasket'

const Cardbasket = ({ product, pushingPrices, sumOfTheProces, howManyProduct }) => {

    const [select, setSelect] = useState('');
    const [counter, setCounter] = useState(0);

    const handleChange = (event) => {
        const size = event.target.value;
        setSelect(size);
    };

    const handleAddorsubs = (data) => {
        if (data === 0 && counter > 0) {
            setCounter(counter - 1)
        } else if (data === 0 && counter === 0) {
            setCounter(0)
        } else {
            setCounter(counter + 1)
        }
    };

    useEffect(() => {
        if (sumOfTheProces.length === 0) {
            setCounter(0);
        }
    }, [sumOfTheProces]);


    return (
        <div className='Cardbasket'>
            <div className="cardbasket-container-img">
                <img src={product.photo} alt={product.name} />
            </div>

            <div className="cardbasket-price">
                <h6>{`$ ${product.price * counter}`}</h6>
            </div>

            <div className="cardbasket-quantity">
                <button onClick={() => { handleAddorsubs(0); pushingPrices(product.price, 0); howManyProduct(product, 0) }}><i className='bx bx-minus'></i></button>
                <div className="cardbasket-counter">
                    {counter}
                </div>
                <button onClick={() => {
                    handleAddorsubs(1); pushingPrices(product.price, 1);
                    howManyProduct(
                        {
                            productID: product.productID,
                            price: product.price,
                            idBuyer: product.idBuyer,
                            color: '',
                            size: select
                        }
                        , 1)
                }}><i className='bx bx-plus'></i></button>
            </div>

            {/**
             * From here all the html and jsx is in position absolute
             */}

            {product.sizes &&
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
                <Deleteproductbasket pushingPrices={pushingPrices} product={product} />
            </div>
        </div>
    );
}

export default Cardbasket;
