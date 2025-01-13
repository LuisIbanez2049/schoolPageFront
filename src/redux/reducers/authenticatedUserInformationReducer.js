import { createReducer } from "@reduxjs/toolkit"
import { loginUserAction, logOutUserAction } from "../actions/authenticatedUserInformationAction"

const initialState = {
    name: null,
    lastName: null,
    email: null,
    rol: null
}  

const authenticatedUserInformationReducer = createReducer(initialState, (builder) => {
    builder.addCase(loginUserAction, (state, action) => {
        return {
            ...state,
            name: action.payload.name,
            lastName: action.payload.lastName,
            email: action.payload.mail,
            rol: action.payload.rol
        }
    })
    .addCase(logOutUserAction, (state, action) => {
        localStorage.removeItem("userInformation")
        return initialState
    })
})

export default authenticatedUserInformationReducer 