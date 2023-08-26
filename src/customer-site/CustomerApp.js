import "./CustomerApp.css";

import { Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import CustomerLayout from "./layouts/CustomerLayout";

import CustomerNotFoundPage from "./pages/errors/CustomerNotFoundPage";
import CustomerRegisterPage from "./pages/auth/CustomerRegisterPage";
import CustomerLoginPage from "./pages/auth/CustomerLoginPage";
import CustomerHomePage from "./pages/CustomerHomePage";
import Cart from './pages/cart/Cart';
// import TestProductsList from '.././customer-site/pages/products/CustomerProductsList';
function CustomerApp() {
    return (
        <Provider store={store}>
            <Routes>
                <Route path="/register" element={<CustomerRegisterPage />} />
                <Route path="/customer/login" element={<CustomerLoginPage />} />
                <Route path="/cart" element={<Cart />} />
                {/* <Route path="/test/list" element={<TestProductsList />} /> */}
                <Route path="/" element={<CustomerLayout />}>
                    <Route index element={<CustomerHomePage />} />
                    <Route path="*" element={<CustomerNotFoundPage />} />

                </Route>
            </Routes>
        </Provider>
    );
};

export default CustomerApp;
