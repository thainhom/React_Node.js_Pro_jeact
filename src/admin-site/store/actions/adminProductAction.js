import { createAction } from "@reduxjs/toolkit";

const addProduct = createAction('ADD_PRODUCT',);

const updateProduct = createAction('UPDATE_PRODUCT');

const deleteProduct = createAction('DELETE_PRODUCT');

export {
    addProduct,
    updateProduct,
    deleteProduct,
}