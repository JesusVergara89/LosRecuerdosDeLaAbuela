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
        const message = `Hola estoy interesad@ en los siguientes productos:\n----\n${productInfo}\nSi los productos tienen algún descuento, se vera reflejado en el total.\n\nDepositar en Bancomer:\n- Número de cuenta: 0127 6001 5224 895165\n- Clave interbancaría: 4152 3142 6339 3632\n- Número de tarjeta: 152 248 9516\n\nEl valor a pagar es: ${products.reduce((accumulator, current) => {
            const price = parseFloat(current.price);
            const onShop = current.onShop;
            const discount_percentage = parseInt(current.discount_percentage)
            const discount = (price * onShop) * (discount_percentage / 100)
            return accumulator + ((price * onShop) - discount);
        }, 0)}`;
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
                        Cuentas con <span>24 minutos</span> para realizar tu compra o los productos seleccionados quedarán libres para otros compradores.
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
                            const discount_percentage = parseInt(current.discount_percentage)
                            const discount = (price * onShop) * (discount_percentage / 100)
                            return accumulator + ((price * onShop) - discount);
                        }, 0)}`}</h6>
                    </div>
                    <button onClick={sendMessageToWhatsApp}>Comprar por WhatsApp</button>
                </div>
            }
        </div>
    )
}

export default Basket