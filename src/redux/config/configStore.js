import { configureStore } from "@reduxjs/toolkit";
import medalLists from '../slices/handleMedalSlice'
const store = configureStore({
    reducer:{medalLists}
})

export default store;