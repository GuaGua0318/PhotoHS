import { createSlice } from "@reduxjs/toolkit";

const Photo = createSlice({
  name:'Photo',
  initialState:{
    user:{}
  },
  reducers:{
    getUser(state,actions){
      state.user = actions.payload;
      console.log(actions)
    }
  }
})
export const { getUser } = Photo.actions;
export default Photo.reducer