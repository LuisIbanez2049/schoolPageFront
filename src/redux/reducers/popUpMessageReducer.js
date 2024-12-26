import { createReducer } from "@reduxjs/toolkit"
import { hiddenPopUpAction, showPopUpAction } from "../actions/popUpMessageAction"


const initialState = {
    isShow: false,
    message: ""
}

const popUpMessageReducer = createReducer(initialState, (builder) => {
    builder.addCase(showPopUpAction, (state, action) => {
        return {
            ...state,
            isShow: action.payload.isShow,
            message: action.payload.message
        }
    })
    .addCase(hiddenPopUpAction, (state, action) => {
        return initialState
    })
})

export default popUpMessageReducer