import { createReducer } from "@reduxjs/toolkit";
import moment from "moment/moment";
import getNextId from "../../utilities/getNextId";

const initialUsers = window.localStorage.getItem('users')
    ? JSON.parse(window.localStorage.getItem('users'))
    : [
        {
            id: 1,
            username: 'QuangHT',
            email: 'quanght@rikkeisoft.com',
            first_name: 'Hoàng',
            last_name: 'Thế Quang',
            password: 'Password123',
            role: 1,
            created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            created_by: 1,
            updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            updated_by: 1,
        }
    ];

const userProducer = createReducer({ users: initialUsers }, {
    ADD_USER: (state, action) => {
        const newUser = {
            ...action.payload,
            id: getNextId(state.users),
            created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            created_by: 1,
            updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            updated_by: 1,
        };

        const newUsers = [...state.users, newUser];

        window.localStorage.setItem('users', JSON.stringify(newUsers));

        return {
            ...state,
            users: [...state.users, newUser],
        };
    },
    UPDATE_USER: (state, action) => {
        const updatedUsers = state.users.map(user => {
            if (user.id === action.payload.id) {
                return {
                    ...user,
                    ...action.payload,
                    updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                    updated_by: 1,
                };
            } else {
                return user;
            }
        });

        window.localStorage.setItem('users', JSON.stringify(updatedUsers));

        return {
            ...state,
            users: updatedUsers,
        };
    },
    DELETE_USER: (state, action) => {
        const updatedUsers = state.users.filter(user => user.id !== action.payload.id);

        window.localStorage.setItem('users', JSON.stringify(updatedUsers));

        return {
            ...state,
            users: updatedUsers,
        };
    },
});

export default userProducer;
