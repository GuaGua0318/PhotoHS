//创建store
import { configureStore } from "@reduxjs/toolkit";
import Photo from "./modules/photo";

export default configureStore({
  reducer:{
    Photo
  }
})