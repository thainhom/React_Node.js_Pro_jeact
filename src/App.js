import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";

import AdminApp from "./admin-site/AdminApp";
import CustomerApp from "./customer-site/CustomerApp";
import CustomerRegisterPage from "./customer-site/pages/auth/CustomerRegisterPage";

function App() {
    return (
        <Routes>
            <Route path="/*" element={<CustomerApp />} />
            <Route path="/admin/*" element={<AdminApp />} />

        </Routes>
    );
};

export default App;
