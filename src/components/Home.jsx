import React from 'react'
import '../styles/Home.css'
import Allproducts from './Allproducts'

const Home = () => {

  let idProduct = null
  let stopPropagation = true

  return (
    <div className="home">
      <Allproducts idProduct={idProduct} stopPropagation={stopPropagation}/>
    </div>
  )
}

export default Home