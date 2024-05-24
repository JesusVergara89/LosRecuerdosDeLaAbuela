import { configureStore } from '@reduxjs/toolkit'
import product from './slices/product.slice'
import listProducts from './slices/listOfProducts.slice'
import allproducts from './slices/allproducts.slice'

export default configureStore({
    reducer: {
        product,
        listProducts,
        allproducts
    }
})