import { createReducer } from "@reduxjs/toolkit"
import { falseAuxAction, truAuxAction } from "../actions/auxAction"

const initialState = {
    isAux : false,
}

const auxReducer = createReducer(initialState, (builder) => {
    builder.addCase(truAuxAction, (state, action) => {
        return {
            ...state,
            isAux: action.payload.isAux
        }
    })
    .addCase(falseAuxAction, (state, action) => {
        return initialState
    })
})

export default auxReducer