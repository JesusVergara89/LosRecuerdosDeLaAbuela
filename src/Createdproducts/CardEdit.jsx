import React, { useState } from 'react'
import Edit from './Edit'

const CardEdit = ({ product }) => {

    const [edit, setEdit] = useState(true)

    const functionEditOrDelete = () => {
        setEdit(!edit)
    }

    return (
        edit === true ? (
            <div className="card">
                <img className="card-image" src={product.image} alt="Robot Image" />
                {product.discount_percentage > 0 && (
                    <div className="card-discount-abs">{`- ${product.discount_percentage}%`}</div>
                )}
                <div className="card-details-1">
                    <div className="card-likes">{`${product.likes.length} likes`}</div>
                    <div className="card-price">
                        {product.discount_percentage > 0 ? (
                            <>
                                <span className="strike-through">{`$${product.price}`}</span>
                                &nbsp;
                                <span>{`$${(product.price * (1 - product.discount_percentage / 100)).toFixed(2)}`}</span>
                            </>
                        ) : (
                            `$${product.price}`
                        )}
                    </div>
                </div>
                <div className="card-details-2">
                    <div className="card-description">{product.description}</div>
                    <div className="card-quantity">{`Cantidad: ${product.quantity}`}</div>
                    <button className="card-btn-buy">Comprar</button>
                </div>
                <div className="card-created">{product.createdAt.toDate().toDateString()}</div>
                <div className="card-edit-delete">
                    <i onClick={functionEditOrDelete} className='bx bx-edit-alt'></i>
                    <i className='bx bx-trash' ></i>
                </div>
            </div>
        ) : (
            <Edit product={product} functionEditOrDelete={functionEditOrDelete} />
        )
    )
}

export default CardEdit