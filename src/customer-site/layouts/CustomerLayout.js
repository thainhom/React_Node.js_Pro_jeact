import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import CustomerHeaderComponent from "../components/partials/CustomerHeaderComponent";
import CustomerFooterComponent from "../components/partials/CustomerFooterComponent";
import authApi from "../../apis/auth.api";
import { setCustomerAuth, logout } from "../store/actions/customerAuthAction";

function CustomerLayout() {
    const dispatch = useDispatch();

    useEffect(() => {
        authApi.getAuth()
            .then(response => {
                if (response.role === 2) {
                    dispatch(setCustomerAuth(response));
                } else {
                    dispatch(logout());
                }
            })
            .catch(error => {
                if (error.response.status === 401) {
                    alert(error.response.statusText);
                    dispatch(logout());
                } else {
                    alert(error.response.statusText);
                }
            })
    }, []);

    return (
        <Container>
            <CustomerHeaderComponent />
            <Outlet />
            <CustomerFooterComponent />
        </Container>
    );
};

export default CustomerLayout;
