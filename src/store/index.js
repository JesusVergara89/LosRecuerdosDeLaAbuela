import { configureStore } from '@reduxjs/toolkit'
import product from './slices/product.slice'
import listProducts from './slices/listOfProducts.slice'

export default configureStore({
    reducer: {
        product,
        listProducts
    }
})