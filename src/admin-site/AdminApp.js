import "./AdminApp.css";

import { Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import AdminLayout from "./layouts/AdminLayout";

import AdminNotFoundPage from "./pages/errors/AdminNotFoundPage";
import AdminLoginPage from "./pages/auth/AdminLoginPage";
import AdminHomePage from "./pages/AdminHomePage";
import UserList from "./pages/users/UserList";
import UserCreate from "./pages/users/UserCreate";
import UserEdit from "./pages/users/UserEdit";
import ProductList from "./pages/products/ProductList";
import ProductCreate from "./pages/products/ProductCreate";
import ProductEdit from "./pages/products/ProductEdit";
import OrderList from "./pages/orders/OrderList";
import OrderCreate from "./pages/orders/OrderCreate";
import OrderEdit from "./pages/orders/OrderEdit";
import ContactList from "./pages/contacts/ContactList";
import ContactCreate from "./pages/contacts/ContactCreate";
import ContactEdit from "./pages/contacts/ContactEdit";
function AdminApp() {
    return (
        <Provider store={store}>
            <Routes>
                <Route path="/login" element={<AdminLoginPage />} />
                <Route path="/" element={<AdminLayout />}>
                    <Route index element={<AdminHomePage />} />
                    <Route path="users" element={<UserList />} />
                    <Route path="users/new" element={<UserCreate />} />
                    <Route path="users/:id/edit" element={<UserEdit />} />
                    <Route path="products" element={<ProductList />} />
                    <Route path="products/new" element={<ProductCreate />} />
                    <Route path="products/:id/edit" element={<ProductEdit />} />
                    <Route path="orders" element={<OrderList />} />
                    <Route path="orders/new" element={<OrderCreate />} />
                    <Route path="orders/:id/edit" element={<OrderEdit />} />
                    <Route path="contacts" element={<ContactList />} />
                    <Route path="contacts/new" element={<ContactCreate />} />
                    <Route path="contacts/:id/edit" element={<ContactEdit />} />
                    <Route path="*" element={<AdminNotFoundPage />} />
                </Route>
            </Routes>
        </Provider>
    );
};

export default AdminApp;
