import React from 'react'
import '../styles/SIngleproductcard.css'
import useBasket from '../hooks/useBasket'

const SIngleproductcard = ({ product }) => {

    const { handlePublish } = useBasket(product)

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
                    <button onClick={handlePublish} className="card-btn-buy">
                        Comprar
                    </button>
                </div>
                <div className="card-created">{product.createdAt.toDate().toDateString()}</div>
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
        </div>
    )
}

export default SIngleproductcard