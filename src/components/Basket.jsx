import { useSelector } from 'react-redux'
import '../styles/Basket.css'
import Cardbasket from './Cardbasket'
import { useState } from 'react'

const Basket = () => {

    const products = useSelector(state => state.callingbasket)

    const [sumOfTheProces, setsumOfTheProces] = useState([])

    const pushingPrices = (price, or) => {
        if (or === 0) {
            if (sumOfTheProces.includes(price)) {
                const index = sumOfTheProces.indexOf(price);
                setsumOfTheProces(prevState => prevState.filter((_, i) => i !== index));
            }
        } else if (or === 1) {
            setsumOfTheProces(prevState => [...prevState, price]);
        } else if (or == 3) {
            setsumOfTheProces([]);
        }
    };

    const totalValues = sumOfTheProces.map(data => parseFloat(data))

    return (
        <div className='Basket'>
            <div className="basket-with-products">
                {
                    products && products.map((product, i) => (
                        <Cardbasket sumOfTheProces={sumOfTheProces} pushingPrices={pushingPrices} index={i} key={i} product={product} />
                    ))
                }
            </div>
            <div className="Basket-total">
                <div className="Basket-total pay">
                    <h6>{`TOTAL: $${totalValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}`}</h6>
                </div>
            </div>
        </div>
    )
}

export default Basket