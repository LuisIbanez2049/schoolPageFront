import { createAction } from "@reduxjs/toolkit"

export const loginAction = createAction("login", (data) => {
    let usuario = {
        token: data,
        isLoggedIn: true
    }
    localStorage.setItem("userToken", JSON.stringify(data))
    return {
        payload: usuario
    }
})

export const logOutAction = createAction("logout")