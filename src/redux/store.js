import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./reducers/autheticationReducer";

const store = configureStore({
    reducer: {
        authenticationReducer
    }
})

export default store;