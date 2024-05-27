import React, { useState } from 'react'
import '../styles/Cardbasket.css'

const Cardbasket = ({ product }) => {

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

    return (
        <div className='Cardbasket'>
            <div className="cardbasket-container-1">
                <img src={product.photo} />
                <div className="cardbasket-price">
                  <h6>{`$ ${product.price}`}</h6>
                  <label>Total:</label> 
                  <h6>{`$ ${counter === 0 ? product.price : product.price*counter }`}</h6>  
                </div>                
            </div>

            <div className="cardbasket-date">
                {/*{product.createdAt.toDate().toDateString()}*/}
            </div>

            <div className="cardbasket-quantity">
                <button onClick={() => { handleAddorsubs(0) }}><i className='bx bx-minus'></i></button>
                <div className="cardbasket-counter">
                    {counter}
                </div>
                <button onClick={() => { handleAddorsubs(1) }} ><i className='bx bx-plus'></i></button>
            </div>

        </div>
    )
}

export default Cardbasket