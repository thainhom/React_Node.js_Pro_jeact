import { createReducer } from "@reduxjs/toolkit";
import moment from "moment/moment";
import getNextId from "../../utilities/getNextId";
const initialOder = window.localStorage.getItem('orders')
    ? JSON.parse(window.localStorage.getItem('orders'))
    : [];

const orderReducer = createReducer({ orders: initialOder }, {
    ADD_ORDER: (state, action) => {
        const newOrder = {
            ...action.payload,
            id: getNextId(state.orders),
            created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            created_by: 1,
            updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            updated_by: 1,
        };

        const newOrders = [...state.orders, newOrder];

        window.localStorage.setItem('orders', JSON.stringify(newOrders));

        return {
            ...state,
            orders: [...state.orders, newOrders],
        };
    },

    UPDATE_ORDER: (state, action) => {
        const updateOrder = state.orders.map(order => {
            if (order.id === action.payload.id) {
                return {
                    ...order,
                    ...action.payload,
                    updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),

                };
            } else {
                return order;
            }
        });

        window.localStorage.setItem('orders', JSON.stringify(updateOrder));

        return {
            ...state,
            orders: updateOrder,
        };
    },
    DELETE_ORDER: (state, action) => {
        const updateOrder = state.orders.filter(order => order.id !== action.payload.id);

        window.localStorage.setItem('orders', JSON.stringify(updateOrder));

        return {
            ...state,
            orders: updateOrder,
        };
    },
});

export default orderReducer;
