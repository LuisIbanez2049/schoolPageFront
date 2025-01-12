import { createAction } from "@reduxjs/toolkit";

export const loginUserAction = createAction("loginUser", (data) => {
    let userInformation = {
        name: data.name,
        lastName: data.lastName,
        email: data.mail,
        rol: data.rol
    }
    return {
        payload:userInformation
    }
})

export const logOutUserAction = createAction("logoutUser")