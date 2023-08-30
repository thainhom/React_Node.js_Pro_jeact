import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import CustomerHeaderComponent from "../components/partials/CustomerHeaderComponent";
import CustomerFooterComponent from "../components/partials/CustomerFooterComponent";

function CustomerLayout() {
    return (
        <Container>
            <CustomerHeaderComponent />
            <Outlet />
            <CustomerFooterComponent />
        </Container>
    );
};

export default CustomerLayout;
