import { createSlice } from '@reduxjs/toolkit';

export const basketSlice = createSlice({
	name: 'basket',
    initialState: 0,
    reducers: {
        setBasketProductValue: (state, action) => action.payload
    }
})

export const { setBasketProductValue } = basketSlice.actions;

export default basketSlice.reducer;