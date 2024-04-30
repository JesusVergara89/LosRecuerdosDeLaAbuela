import React from 'react'

const Searchingproducts = ({filtro,handleInputChange}) => {
    return (
        <>
            <div className="Allproducts-title">
                <img src="https://raw.githubusercontent.com/JesusVergara89/ImagesWeb/d6a9afe1b3d685f1efa1cec810b291eb6a8f54be/FindProdcuts.png" alt="" />
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