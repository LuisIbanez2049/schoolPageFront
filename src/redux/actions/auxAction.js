import { createAction } from "@reduxjs/toolkit";


export const truAuxAction = (createAction("tru", (data) => {
    let bodyAux = {
        isAux: true
    }
    return {
        payload: bodyAux
    }
}))

export const falseAuxAction = createAction("false")