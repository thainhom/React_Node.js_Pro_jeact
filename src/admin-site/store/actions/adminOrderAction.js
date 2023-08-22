import { createAction } from "@reduxjs/toolkit";

const addOrder = createAction('ADD_ORDER');

const updateOrder = createAction('UPDATE_ORDER');

const deleteOrder = createAction('DELETE_ORDER');

export {
    updateOrder,
    deleteOrder,
    addOrder

}