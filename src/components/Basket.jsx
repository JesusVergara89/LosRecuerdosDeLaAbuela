import { useSelector } from 'react-redux'
import '../styles/Basket.css'
import Cardbasket from './Cardbasket'

const Basket = () => {

    const products = useSelector(state => state.callingbasket)

    return (
        <div className='Basket'>
            <div className="basket-with-products">
                {
                    products && products.map((product, i) => (
                        <Cardbasket key={i} product={product} />
                    ))
                }
            </div>
            
        </div>
    )
}

export default Basket