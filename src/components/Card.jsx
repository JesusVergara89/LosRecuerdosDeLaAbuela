import React from 'react'
import '../styles/Card.css'
import Likes from './Likes';
import useBasket from '../hooks/useBasket';

const Card = ({ setIDValue, product, handleScrollToTop, handleClick }) => {

    const { handlePublish } = useBasket(product)

    return (
        <>
            <div className="card">
                <img onClick={() => { setIDValue(product.id); handleScrollToTop(); handleClick() }} className="card-image" src={product.image} alt="Product Image" />
                <div className={product.discount_percentage > 0 ? "card-discount-abs" : ''}>{product.discount_percentage > 0 ? `- ${product.discount_percentage}%` : ' '}</div>
                <div className="card-details-1">
                    <div className="card-likes">
                        <Likes product={product} />
                        <div onClick={handleClick} className="card-likes-comments">
                            <i class='bx bxs-message-dots'></i>
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
                    <button onClick={handlePublish} className="card-btn-buy">
                        Agregar al carrito
                    </button>
                </div>
                <div className="card-created">{typeof (product.createdAt) === 'number' ? new Date(product.createdAt).toLocaleString() : product.createdAt.toDate().toDateString()}</div>
            </div>
        </>
    )
}

export default Card