import React from 'react'
import '../styles/Card.css'
import Likes from './Likes';
import useBasket from '../hooks/useBasket'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';

const Card = ({ setIDValue, product, handleScrollToTop, handleClick }) => {

    const { handlePublish } = useBasket(product)

    const [user] = useAuthState(auth)

    return (
        <>
            <div className="card">
                <img onClick={() => { setIDValue(product.id); handleScrollToTop(); handleClick(product.id) }} className="card-image" src={product.image} alt="Product Image" />
                <div className={product.discount_percentage > 0 ? "card-discount-abs" : ''}>{product.discount_percentage > 0 ? `- ${product.discount_percentage}%` : ' '}</div>
                <div className="card-details-1">
                    <div className="card-likes">
                        <Likes product={product} />
                        <div className="card-likes-comments">
                            <i className='bx bxs-message-dots'></i>
                            <h6>{product.Comments ? product.Comments.length : 0}</h6>
                        </div>
                    </div>
                    <div className="card-price">
                        {product.discount_percentage > 0 ? (
                            <>
                                <span className="strike-through">{`$${product.price}`}</span>
                                &nbsp;
                                <span>{` - $${product.price - (product.price * product.discount_percentage) / 100}`}</span>
                            </>
                        ) : (
                            `$${product.price}`
                        )}
                    </div>
                </div>

                <div className="card-details-2">
                    <div className="card-description">{product.description}</div>
                    <div className="card-quantity">{`Cantidad: ${product.quantity - product.onShop_quantity}`}</div>
                    {
                        product.onShop_quantity === parseInt(product.quantity) ?
                            <button className="card-btn-buy-no-more">
                                Todos las unidades estan siendo compradas
                            </button>
                            :
                            <button onClick={handlePublish} className="card-btn-buy">
                                Agregar al carrito
                            </button>
                    }
                </div>
                {product.onShop_quantity === parseInt(product.quantity) ?
                    <div className="onshop">
                        <h4>Regresa en 25 minutos para ver disponibilidad.</h4>
                        <h4>{user ? '': `o Inicia sesión`}</h4>
                    </div>
                    :
                    ''
                }
            </div>
        </>
    )
}

export default Card