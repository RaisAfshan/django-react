import { configureStore } from "@reduxjs/toolkit";
import taskSlice from './taskSlice'
const  store = configureStore({
    reducer:{
        list:taskSlice,
    }
})