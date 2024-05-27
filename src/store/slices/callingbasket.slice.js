import { createSlice } from '@reduxjs/toolkit';

export const callingbasketSlice = createSlice({
	name: 'basket',
    initialState: [],
    reducers: {
        setCallingBasketProductValue: (state, action) => action.payload
    }
})

export const { setCallingBasketProductValue } = callingbasketSlice.actions;

export default callingbasketSlice.reducer;