import { createReducer } from "@reduxjs/toolkit";

const adminAuthReducer = createReducer({}, {
    ADMIN_LOGIN: (state, action) => state,
    ADMIN_LOGOUT: (state, action) => state,
});

export default adminAuthReducer;
