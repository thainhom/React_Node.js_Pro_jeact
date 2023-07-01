import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import adminUserReducer from "./reducers/adminUserReducer";
import adminAuthReducer from "./reducers/adminAuthReducer";

const reducer = combineReducers({
    adminAuthReducer: adminAuthReducer,
    adminUserReducer: adminUserReducer,
});

const store = configureStore({
    reducer: reducer
});

export default store;
