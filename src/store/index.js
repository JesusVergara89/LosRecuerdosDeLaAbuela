import { configureStore } from '@reduxjs/toolkit'
import product from './slices/product.slice'

export default configureStore({
    reducer: {
        product
    }
})