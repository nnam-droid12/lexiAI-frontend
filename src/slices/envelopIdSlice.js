import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

const initialState = {
  envelopId: null,
};
// Create a slice for storing POST response globally
const postResponseSlice = createSlice({
  name: 'postResponse',
  initialState,
  reducers: {
    setPostResponse: (state, action) => {
        return {
            ...state,
            envelopId: action.payload, // Update with the payload
          };
    },
  },
});

export const { setPostResponse } = postResponseSlice.actions;
export default postResponseSlice.reducer;
