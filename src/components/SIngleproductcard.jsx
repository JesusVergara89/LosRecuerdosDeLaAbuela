import React from 'react'
import '../styles/SIngleproductcard.css'
import { Link } from 'react-router-dom'

const SIngleproductcard = ({ product }) => {
    return (
        <div className='Mapsingleprodcut'>
            <div className="card">
                <img className="card-image-SIngleproductcard" src={product.image} alt="Robot Image" />
                <div className={product.discount_percentage > 0 ? "card-discount-abs" : ''}>{product.discount_percentage > 0 ? `- ${product.discount_percentage}%` : ' '}</div>
                <div className="card-details-1">
                    <div className="card-likes">{`${product.likes.length} likes`}</div>
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
                    <button className="card-btn-buy">
                        Comprar
                    </button>
                </div>
                <div className="card-created">{product.createdAt.toDate().toDateString()}</div>
            </div>

        </div>
    )
}

export default SIngleproductcard