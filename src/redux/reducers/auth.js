import {asyncLogin} from '../actions/auth';

const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  token: null,
  errorMessage: '',
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
    },
    logout: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(asyncLogin.fulfilled, (state, action) => {
      state.token = action.payload;
    });
    builder.addCase(asyncLogin.rejected, (state, action) => {
      state.errorMessage = action.payload;
    });
  },
});
export const {login, logout} = auth.actions;
export default auth.reducer;
