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

        const userLogin = (localStorage.getItem("X-API-Key"));
        console.log(userLogin);
        const newOrder = {
            order_id: getNextId(orders, 'order_id'),
            serial_number: getNextId(orders),
            user_id: userLogin.user_id,
            order_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            total_price: calculateTotal(state.cart),
            status: 1,
            note: action.payload.note,
            orderDetails: state.cart,
            created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            created_by_id: userLogin.user_id,
            updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            updated_by_id: userLogin.user_id,
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
