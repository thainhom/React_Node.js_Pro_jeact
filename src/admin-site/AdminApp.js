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
                    <Route path="*" element={<AdminNotFoundPage />} />
                </Route>
            </Routes>
        </Provider>
    );
};

export default AdminApp;
