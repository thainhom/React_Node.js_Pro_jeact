import { createReducer } from "@reduxjs/toolkit";

const customerAuthReducer = createReducer({ isAuthenticate: false }, {
    CUSTOMER_REGISTER: (state, action) => state,
    CUSTOMER_LOGIN: (state, action) => {
        window.localStorage.setItem('X-API-Key', action.payload);
        return {
            ...state,
            isAuthenticate: true
        };
    },
    CUSTOMER_LOGOUT: (state, action) => {
        window.localStorage.removeItem('X-API-Key');
        return {
            ...state,
            isAuthenticate: false
        }
    }
});

export default customerAuthReducer;
