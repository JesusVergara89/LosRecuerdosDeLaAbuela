import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Categorycomponent = () => {

    const { section } = useParams()

    const allproducts = useSelector(state => state.allproducts)

    //onst msgNotification = useSelector(state => state.countermsg);
    console.log(allproducts)

    return (
        <div className='categorycomponent'>
            {section}
        </div>
    )
}

export default Categorycomponent