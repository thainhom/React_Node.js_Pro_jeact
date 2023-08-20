import { createAction } from "@reduxjs/toolkit";
const addProduct = createAction("ADD_PRODUCT");
const deleteProduct = createAction("DELETE_PRODUCT");
const editProduct = createAction("EDIT_PRODUCT");
export { addProduct, deleteProduct, editProduct, }
