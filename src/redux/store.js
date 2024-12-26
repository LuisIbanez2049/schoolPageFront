import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./reducers/autheticationReducer";
import popUpMessageReducer from "./reducers/popUpMessageReducer";

const store = configureStore({
    reducer: {
        authenticationReducer,
        popUpMessageReducer
    }
})

export default store;