import { createAction } from "@reduxjs/toolkit";

const addToCart = createAction("ADD_TO_CART");
const changeQuantity = createAction("CHANGE_Quantity");
const checkout = createAction("CHECKOUT");
const deleteFromCart = createAction("DELETE_FROM_CART");

export {
    addToCart,
    changeQuantity,
    checkout,
    deleteFromCart,
}