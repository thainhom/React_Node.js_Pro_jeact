import { createReducer } from "@reduxjs/toolkit";
import moment from "moment/moment";
import getNextId from "../../utilities/getNextId";

const initialProduct = window.localStorage.getItem('products')
    ? JSON.parse(window.localStorage.getItem('products'))
    : [];

const productReducer = createReducer({ products: initialProduct }, {
    ADD_PRODUCT: (state, action) => {
        const newProduct = {
            ...action.payload,
            id: getNextId(state.products),
            created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            created_by: 1,
            updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            updated_by: 1,
        };

        const newProducts = [...state.products, newProduct];

        window.localStorage.setItem('products', JSON.stringify(newProducts));

        return {
            ...state,
            products: [...state.products, newProducts],
        };
    },
    UPDATE_PRODUCT: (state, action) => {
        const updatedProduct = state.products.map(product => {
            if (product.id === action.payload.id) {
                return {
                    ...product,
                    ...action.payload,
                    updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                    updated_by: 1,
                };
            } else {
                return product;
            }
        });

        window.localStorage.setItem('products', JSON.stringify(updatedProduct));

        return {
            ...state,
            products: updatedProduct,
        };
    },
    DELETE_PRODUCT: (state, action) => {
        const updatedProduct = state.products.filter(product => product.id !== action.payload.id);

        window.localStorage.setItem('products', JSON.stringify(updatedProduct));

        return {
            ...state,
            products: updatedProduct,
        };
    },
});

export default productReducer;
