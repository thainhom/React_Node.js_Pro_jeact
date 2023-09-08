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
import CustomerHeaderComponent from "./components/partials/CustomerHeaderComponent";
import CustomerFooterComponent from '.././customer-site/components/partials/CustomerFooterComponent';
import CustomerContacts from "./pages/contacts/CustomerContacts"
import CustomerProductList from "./pages/products/CustomerProductList";
import Orders from "./pages/orders/Orders";

function CustomerApp() {
    return (
        <Provider store={store}>
            <Routes>
                <Route path="register" element={<CustomerRegisterPage />} />
                <Route path="login" element={<CustomerLoginPage />} />
                <Route path="/" element={<CustomerLayout />}>
                    <Route index element={<CustomerHomePage />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="header" element={<CustomerHeaderComponent />} />
                    <Route path="footer" element={<CustomerFooterComponent />} />
                    <Route path="products" element={<CustomerProductList />} />
                    <Route path="contact" element={<CustomerContacts />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="*" element={<CustomerNotFoundPage />} />

                </Route>
            </Routes>
        </Provider>
    );
};

export default CustomerApp;
