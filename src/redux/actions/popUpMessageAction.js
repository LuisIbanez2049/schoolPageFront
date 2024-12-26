import { createAction } from "@reduxjs/toolkit";


export const showPopUpAction = createAction("show", (data) => {
    let bodyPopUpMessage = {
       isShow: true,
       message: data
    }
    return {
        payload: bodyPopUpMessage
    }
})

export const hiddenPopUpAction = createAction("hidden")