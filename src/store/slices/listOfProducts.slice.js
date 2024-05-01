import { createSlice } from '@reduxjs/toolkit';

export const listOfProductSlice = createSlice({
	name: 'list',
    initialState: '',
    reducers: {
        setListProductValue: (state, action) => action.payload
    }
})

export const { setListProductValue } = listOfProductSlice.actions;

export default listOfProductSlice.reducer;