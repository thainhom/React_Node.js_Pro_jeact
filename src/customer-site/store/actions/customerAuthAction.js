import { createAction } from "@reduxjs/toolkit";

const login = createAction('CUSTOMER_LOGIN');

const setAdminAuth = createAction('CUSTOMER_SET_AUTH');

const logout = createAction('CUSTOMER_LOGOUT');

export {
    login,
    setAdminAuth,
    logout,
}

