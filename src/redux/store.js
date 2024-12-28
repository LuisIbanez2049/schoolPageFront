import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./reducers/autheticationReducer";
import popUpMessageReducer from "./reducers/popUpMessageReducer";
import auxReducer from "./reducers/auxReducer";

const store = configureStore({
    reducer: {
        authenticationReducer,
        popUpMessageReducer,
        auxReducer
    }
})

export default store;