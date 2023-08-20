import { createAction } from "@reduxjs/toolkit";
const addToCart = createAction("ADD_TO_CART");
const deleteFromCart = createAction("DELETE_FROM_CART");
const changeQuantity = createAction("CHANGE_Quantity");
const checkout = createAction("CHECKOUT");
const addOrder = createAction("ADD_ORDER");
const deleteOrder = createAction("DELETE_ORDER");
export { deleteOrder, addToCart, changeQuantity, deleteFromCart, checkout, addOrder }
