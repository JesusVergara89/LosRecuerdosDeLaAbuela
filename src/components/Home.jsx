import React from 'react'
import '../styles/Home.css'
import Allproducts from './Allproducts'

const Home = () => {

  let idProduct = null

  return (
    <div className="home">
      <Allproducts idProduct={idProduct} />
    </div>
  )
}

export default Home