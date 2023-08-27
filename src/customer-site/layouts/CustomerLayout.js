import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

function CustomerLayout() {
    return (
        <Container>

            <Outlet />
            {/* <div>Footer <code>FIXME: src/customer-site/layouts/CustomerLayout.js</code></div> */}
        </Container>
    );
};

export default CustomerLayout;
