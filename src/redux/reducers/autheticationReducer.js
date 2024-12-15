import {createReducer} from "@reduxjs/toolkit"
import { loginAction, logOutAction } from "../actions/authenticationAction"
const initialState = {
    token: null,
    isLoggedIn: false
}

const authenticationReducer = createReducer(initialState, (builder) => {
    builder.addCase(loginAction, (state, action) => {
        return {
            ...state, 
            token: action.payload.token,
            isLoggedIn: action.payload.isLoggedIn
        }
    })
    .addCase(logOutAction, (state, action) => {
        localStorage.removeItem("userToken")
        return initialState
    })
})

export default authenticationReducer