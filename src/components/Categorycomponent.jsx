import React from 'react'
import { useParams } from 'react-router-dom'

const Categorycomponent = () => {
    const { section } = useParams()
    return (
        <div>{section}</div>
    )
}

export default Categorycomponent