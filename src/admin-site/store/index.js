import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import adminUserReducer from "./reducers/adminUserReducer";
import adminAuthReducer from "./reducers/adminAuthReducer";
import adminProductReducer from "./reducers/adminProductReducer";

const reducer = combineReducers({
    adminAuthReducer: adminAuthReducer,
    adminUserReducer: adminUserReducer,
    adminProductReducer: adminProductReducer
});

const store = configureStore({
    reducer: reducer
});

export default store;
