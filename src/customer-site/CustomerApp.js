import "./CustomerApp.css";

import { Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import CustomerLayout from "./layouts/CustomerLayout";

import CustomerNotFoundPage from "./pages/errors/CustomerNotFoundPage";
import CustomerRegisterPage from "./pages/auth/CustomerRegisterPage";
import CustomerLoginPage from "./pages/auth/CustomerLoginPage";
import CustomerHomePage from "./pages/CustomerHomePage";

function CustomerApp() {
    return (
        <Provider store={store}>
            <Routes>
                <Route path="/register" element={<CustomerRegisterPage />} />
                <Route path="/login/users" element={<CustomerLoginPage />} />
                <Route path="/" element={<CustomerLayout />}>
                    <Route path="/home" element={<CustomerHomePage />} />
                    <Route path="*" element={<CustomerNotFoundPage />} />
                </Route>
            </Routes>
        </Provider>
    );
};

export default CustomerApp;
