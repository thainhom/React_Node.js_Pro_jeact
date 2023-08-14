import { createAction } from "@reduxjs/toolkit";

const login = createAction('ADMIN_LOGIN');

const setAdminAuth = createAction('ADMIN_SET_AUTH');

const logout = createAction('ADMIN_LOGOUT');

export {
    login,
    setAdminAuth,
    logout,
}
