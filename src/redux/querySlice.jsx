import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  queries: [],
  results: null,
  isLoading: false,
  error: null,
};
 
const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    submitQuery: (state, action) => {
      state.queries.unshift(action.payload);
      state.isLoading = true;
      state.error = null;
    },
    querySuccess: (state, action) => {
      state.results = action.payload;
      state.isLoading = false;
    },
    queryError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { submitQuery, querySuccess, queryError } = querySlice.actions;
export default querySlice.reducer;