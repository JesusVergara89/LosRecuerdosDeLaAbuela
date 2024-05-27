import { configureStore } from '@reduxjs/toolkit'
import product from './slices/product.slice'
import listProducts from './slices/listOfProducts.slice'
import allproducts from './slices/allproducts.slice'
import basketProducts from './slices/basketproducts.slice'
import callingbasket from './slices/callingbasket.slice'

export default configureStore({
    reducer: {
        product,
        listProducts,
        allproducts,
        basketProducts,
        callingbasket
    }
})