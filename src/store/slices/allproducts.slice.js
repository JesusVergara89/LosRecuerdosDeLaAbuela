import { createSlice } from '@reduxjs/toolkit';

export const allproductSlice = createSlice({
	name: 'allproducts',
    initialState: [],
    reducers: {
        setAllproductsValue: (state, action) => action.payload
    }
})

export const { setAllproductsValue } = allproductSlice.actions;

export default allproductSlice.reducer;