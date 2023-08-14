import { createAction } from "@reduxjs/toolkit";

const addUser = createAction('ADD_USER');

const updateUser = createAction('UPDATE_USER');

const deleteUser = createAction('DELETE_USER');

export {
    addUser,
    updateUser,
    deleteUser,
}