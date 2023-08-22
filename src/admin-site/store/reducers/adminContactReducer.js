import { createReducer } from "@reduxjs/toolkit";
import moment from "moment/moment";
import getNextId from "../../utilities/getNextId";

const initialContacts = window.localStorage.getItem('contacts')
    ? JSON.parse(window.localStorage.getItem('contacts'))
    : [];

const contactsRuducer = createReducer({ contacts: initialContacts }, {
    ADD_CONTACT: (state, action) => {
        const newContact = {
            ...action.payload,
            id: getNextId(state.contacts),
            created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            created_by: 1,
            updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            updated_by: 1,
        };

        const newContacts = [...state.contacts, newContact];

        window.localStorage.setItem('contacts', JSON.stringify(newContacts));

        return {
            ...state,
            contacts: [...state.contacts, newContacts],
        };
    },
    UPDATE_CONTACT: (state, action) => {
        const updatedContact = state.contacts.map(contact => {
            if (contact.id === action.payload.id) {
                return {
                    ...contact,
                    ...action.payload,
                    updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                    updated_by: 1,
                };
            } else {
                return contact;
            }
        });

        window.localStorage.setItem('contacts', JSON.stringify(updatedContact));

        return {
            ...state,
            contacts: updatedContact,
        };
    },
    DELETE_CONTACT: (state, action) => {
        const updatedcontact = state.contacts.filter(contact => contact.id !== action.payload.id);

        window.localStorage.setItem('contacts', JSON.stringify(updatedcontact));

        return {
            ...state,
            contacts: updatedcontact,
        };
    },
});

export default contactsRuducer;
