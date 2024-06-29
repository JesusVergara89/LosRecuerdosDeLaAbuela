import React, { useRef } from 'react'
import '../styles/SIngleproductcard.css'
import useBasket from '../hooks/useBasket'
import Likes from './Likes'
import Comments from './Comments'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseConfig'

const SIngleproductcard = ({ product }) => {

    const { handlePublish } = useBasket(product)

    const [user] = useAuthState(auth)

    const commentsRef = useRef(null);

    const scrollToComments = () => {
        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className='Mapsingleprodcut'>
            <div className="card">
                <img className="card-image-SIngleproductcard" src={product.image} alt="Robot Image" />
                <div className={product.discount_percentage > 0 ? "card-discount-abs" : ''}>{product.discount_percentage > 0 ? `- ${product.discount_percentage}%` : ' '}</div>
                <div className="card-details-1">
                    <div className="card-likes">
                        <Likes product={product} />
                        <div onClick={scrollToComments} className="card-likes-comments">
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
                    <div className="card-quantity">{`Cantidad: ${product.quantity}`}</div>
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
                        <h4>{user ? '' : `Inicia sesión`}</h4>
                    </div>
                    :
                    ''
                }
            </div>
            <div className="card-description-all-details">
                <label>Descripción</label>
                <div className="card-description-details">
                    {product.description}
                </div>
                <label>{`${product.colors.length === 0 ? '' : 'Colores disponibles'}`}</label>
                <div className="card-description-colors">
                    {product.colors.map((data, i) => (
                        <p className={data.toLowerCase()} key={i}>{data.toLowerCase()}</p>
                    ))}
                </div>
                <label>{`${product.sizes.length === 0 ? '' : 'Tallas disponibles'}`}</label>
                <div className="card-description-sizes">
                    {product.sizes.map((data, i) => (
                        <p key={i}>{data.toLowerCase()}</p>
                    ))}
                </div>
            </div>
            <div ref={commentsRef}></div>
            <Comments id={product.id} />
        </div>
    )
}

export default SIngleproductcard
