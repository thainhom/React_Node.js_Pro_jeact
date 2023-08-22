import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import adminUserReducer from "./reducers/adminUserReducer";
import adminAuthReducer from "./reducers/adminAuthReducer";
import adminProductReducer from "./reducers/adminProductReducer";
import adminOrderReducer from "./reducers/adminOrderReducer";
import adminContactReducer from "./reducers/adminContactReducer";

const reducer = combineReducers({
    adminAuthReducer: adminAuthReducer,
    adminUserReducer: adminUserReducer,
    adminProductReducer: adminProductReducer,
    adminOrderReducer: adminOrderReducer,
    adminContactReducer: adminContactReducer

});

const store = configureStore({
    reducer: reducer
});

export default store;
