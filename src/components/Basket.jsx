import { useSelector } from 'react-redux'
import '../styles/Basket.css'
import Cardbasket from './Cardbasket'

const Basket = () => {

    const products = useSelector(state => state.callingbasket)

    const productInfo = products.map(product => {
        if (product && product.tallas && product.tallas !== '' && product && product.colores !== '') {
            return `Id comprador: ${product.idBuyer}\nId producto: ${product.productID}\nColores requeridos: ${product.colores}\nTallas requeridas: ${product.tallas}\nPrecio: ${product.price}\nCantidad requerida: ${product.onShop}\n\nImagen: ${product.photo}\n\n`;
        } else {
            return `Id comprador: ${product?.idBuyer}\nId producto: ${product?.productID}\nPrecio: ${product?.price}\nImagen: ${product?.photo}\n\n`;
        }
    }).join('\n');

    const sendMessageToWhatsApp = () => {
        const phoneNumber = '+526624698604';
        const message = `Hola estoy interesad@ en los siguientes productos:\n----\n${productInfo}\n\nEl valor a pagar es: ${products.reduce((accumulator, current) => {
            const price = parseFloat(current.price); 
            const onShop = current.onShop;
            return accumulator + (price * onShop);
        }, 0)}`;
        const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(whatsappLink);
    }

    //console.log(products)

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
                            <Cardbasket key={i} product={product} />
                        ))
                    }
                </div>
            }
            {products.length === 0 ?
                ''
                :
                <div className="Basket-total">
                    <div className="Basket-total-pay">
                        <h6>{`TOTAL: $ ${products.reduce((accumulator, current) => {
                            const price = parseFloat(current.price); 
                            const onShop = current.onShop;
                            return accumulator + (price * onShop);
                        }, 0)}`}</h6>
                    </div>
                    <button onClick={sendMessageToWhatsApp}>Comprar por WhatsApp</button>
                </div>
            }
        </div>
    )
}

export default Basket