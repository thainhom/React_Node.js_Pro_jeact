import { createReducer } from "@reduxjs/toolkit"
import moment from "moment/moment";
import getNextId from "../../../admin-site/utilities/getNextId";

const calculateTotal = (cart) => {
    let total = 0;

    for (let item of cart) {
        total += item.subTotal;
    }

    return total;
}

const getCartFromLocalStorage = () => {
    return window.localStorage.getItem('cart') ? JSON.parse(window.localStorage.getItem('cart')) : []
}

const cart = getCartFromLocalStorage();

const initState = {
    cart: cart,
    numberOfItems: cart.length,
    total: calculateTotal(cart)
}

const customerCartListReducer = createReducer(initState, {
    ADD_TO_CART: (state, action) => {
        let isExist = false
        let cart = state.cart.map(item => {
            if (item.product_id === action.payload.product_id) {
                isExist = true
                const quantity = item.quantity + action.payload.quantity

                return {
                    ...item,
                    quantity: quantity,
                    subTotal: item.unit_price * quantity
                }
            }

            return item
        })

        if (!isExist) {
            cart = [...cart, { ...action.payload, quantity: action.payload.quantity, subTotal: action.payload.unit_price * action.payload.quantity }]
        }

        return {
            cart: cart,
            numberOfItems: cart.length,
            total: calculateTotal(cart)
        }
    },
    CHANGE_Quantity: (state, action) => {
        const cart = state.cart.map(item => {
            if (item.product_id === action.payload) {
                item.quantity = action.payload.quantity
                item.subTotal = item.unit_price * item.quantity
            }
        })

        return {
            cart: cart,
            numberOfItems: cart.length,
            total: calculateTotal(cart)
        }
    },
    CHECKOUT: (state, action) => {
        const orders = window.localStorage.getItem('orders') ? JSON.parse(window.localStorage.getItem('orders')) : [];

        const newOrder = {
            total_price: calculateTotal(state.cart),
            note: action.payload.note,
            orderDetails: state.cart,
        }

        window.localStorage.setItem('orders', JSON.stringify([...orders, newOrder]))
        window.localStorage.removeItem('cart')

        return {
            cart: [],
            numberOfItems: 0,
            total: 0
        }
    },
    DELETE_FROM_CART: (state, action) => {
        const idFromCart = action.payload
        state.cart = state.cart.filter(c => c.product_id !== idFromCart)


    },
})

export default customerCartListReducer
