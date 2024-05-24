import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import '../styles/Categorycomponent.css'
import Mapsingleprodcut from './Mapsingleprodcut'

const Categorycomponent = () => {

    const { section } = useParams()

    const navigate = useNavigate()

    const allproducts = useSelector(state => state.allproducts)

    const productsSection = allproducts?.filter((data, i) => {
        if (data.Category === section) {
            return data
        }
    })

    return (
        <div className='categorycomponent'>
            {
                 productsSection.map((product, i) => (
                    <Mapsingleprodcut product={product} key={i} />
                ))
            }

        </div>
    )
}

export default Categorycomponent