import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import customerAuthReducer from "./reducers/customerAuthReducer";
import customerCartListReducer from "./reducers/customerCartListReducer";
const reducer = combineReducers({
    customerAuthReducer: customerAuthReducer,
    customerCartListReducer: customerCartListReducer
});

const store = configureStore({
    reducer: reducer
});

export default store;
