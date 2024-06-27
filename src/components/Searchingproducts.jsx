import React from 'react'

const Searchingproducts = ({ filtro, handleInputChange }) => {
    return (
        <>
            <div className="Allproducts-title">
                <h2>Filtra productos por:</h2>
                <ul>
                    <li> <span>- </span>Categoría</li>
                    <li><span>- </span>Descripción</li>
                </ul>
            </div>

            <div className="all-user-find-inner">
                <input
                    id='inputfind'
                    type="text"
                    value={filtro}
                    onChange={handleInputChange}
                    placeholder="Buscar productos..."
                />
            </div>
        </>
    )
}

export default Searchingproducts