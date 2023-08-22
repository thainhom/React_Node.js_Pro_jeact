import { createAction } from "@reduxjs/toolkit";

const addContact = createAction('ADD_CONTACT');

const editContact = createAction('UPDATE_CONTACT');

const deleteContact = createAction('DELETE_CONTACT');

export {
    addContact,
    editContact,
    deleteContact

}