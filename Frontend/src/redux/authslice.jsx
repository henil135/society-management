import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    StoreUser: (state, action) => {
      state.user = action.payload;
    },
    UpdateUser:(state,action)=>{
      state.user = action.payload;
    },
    LogoutUser:(state) =>{
      state.user = null;
      state.isAuthenticate = false;
    }
  },
});

export const { StoreUser,UpdateUser,LogoutUser } = authSlice.actions;
export default authSlice.reducer;