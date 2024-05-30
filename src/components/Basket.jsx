import { useSelector } from 'react-redux'
import '../styles/Basket.css'
import Cardbasket from './Cardbasket'
import { useEffect, useState } from 'react'

const Basket = () => {

    const products = useSelector(state => state.callingbasket)

    const [sumOfTheProces, setsumOfTheProces] = useState([])
    const [productsToBuy, setProductsToBUy] = useState([])

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

    const howManyProduct = (product, or) => {
        if (or === 0) {
            const productIndex = productsToBuy.findIndex(p => p.productID === product.productID);
            if (productIndex !== -1) {
                const updatedProducts = [...productsToBuy];
                updatedProducts.splice(productIndex, 1);
                setProductsToBUy(updatedProducts);
            }
        } else if (or === 1) {
            setProductsToBUy(prevState => [...prevState, product]);
        }
    };

    const totalValues = sumOfTheProces.map(data => parseFloat(data))

    const productInfo = productsToBuy.map(product => {
        if (product.size === '' && product.color === '') {
            return `Id comprador: ${product.idBuyer}\nId producto: ${product.productID}\nPrecio: ${product.price}\nImagen: ${product.photo}\n\n`;
        } else {
            return `Id Comprador: ${product.idBuyer}\nId producto: ${product.productID}\nColor: ${product.color}\nTalla: ${product.size}\nPrecio:  ${product.price}\nImagen: ${product.photo}\n\n`;
        }
    }).join('\n');

    const sendMessageToWhatsApp = () => {
        const phoneNumber = '+573222117823';
        const message = `Hola estoy interesad@ en los siguientes productos:\n----\n${productInfo}\n\nEl valor a pagar es: ${totalValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}`;
        const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(whatsappLink);
    }

    return (
        <div className='Basket'>
            {products.length === 0 ?
                <h6 className='basket-empty'>No haz seleccionado ningún producto.</h6>
                :
                <div className="basket-with-products">
                    <h6 className="basket-sellection">
                        Si el producto aplica para <span>tallas</span> y <span>colores</span>, no te le olvide seleccionar la talla y el color adecuado antes de agregar cantidades del mismo.
                    </h6>
                    {
                        products && products.map((product, i) => (
                            <Cardbasket setProductsToBUy={setProductsToBUy} howManyProduct={howManyProduct} sumOfTheProces={sumOfTheProces} pushingPrices={pushingPrices} index={i} key={i} product={product} />
                        ))
                    }
                </div>
            }
            {products.length === 0 ?
                ''
                :
                <div className="Basket-total">
                    <div className="Basket-total-pay">
                        <h6>{`TOTAL: $ ${totalValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}`}</h6>
                    </div>
                    <button onClick={sendMessageToWhatsApp}>Comprar por WhatsApp</button>
                </div>
            }
        </div>
    )
}

export default Basket