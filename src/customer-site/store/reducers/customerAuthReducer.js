import { createReducer } from "@reduxjs/toolkit";

const customerAuthReducer = createReducer({}, {
    CUSTOMER_REGISTER: (state, action) => state,
    CUSTOMER_LOGIN: (state, action) => state,
    CUSTOMER_LOGOUT: (state, action) => state,
});

export default customerAuthReducer;
