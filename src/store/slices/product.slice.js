import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
	name: 'product',
    initialState: '',
    reducers: {
        setIdValue: (state, action) => action.payload
    }
})

export const { setIdValue } = productSlice.actions;

export default productSlice.reducer;