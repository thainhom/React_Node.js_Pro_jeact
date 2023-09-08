import { createAction } from "@reduxjs/toolkit";

const login = createAction('CUSTOMER_LOGIN');

const setCustomerAuth = createAction('CUSTOMER_SET_AUTH');

const logout = createAction('CUSTOMER_LOGOUT');

export {
    login,
    setCustomerAuth,
    logout,
}

