import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./reducers/autheticationReducer";
import popUpMessageReducer from "./reducers/popUpMessageReducer";
import auxReducer from "./reducers/auxReducer";
import authenticatedUserInformationReducer from "./reducers/authenticatedUserInformationReducer";

const store = configureStore({
    reducer: {
        authenticationReducer,
        popUpMessageReducer,
        auxReducer, 
        authenticatedUserInformationReducer
    }
})

export default store;