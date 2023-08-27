import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom";
import { Carousel, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import authApi from "../../../apis/auth.api";
import { logout } from "../../store/actions/customerAuthAction";
function CustomerHeaderComponent() {
    const numberOfItems = useSelector(state => state.customerCartListReducer.numberOfItems)


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogOut = () => {
        authApi.logout().then(response => {
            dispatch(logout())
            navigate("/customer/login")
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <>
            <Navbar expand="lg"
                className="bg-body-tertiary "
                style={{
                    position: 'sticky', top: 0, zIndex: 1000,
                    backgroundImage: "url('https://tophinhanhdep.com/wp-content/uploads/2021/10/4k-Color-Wallpapers.jpg')",
                    backgroundSize: 'cover'

                }}

            >
                <Container fluid >
                    <Container>
                        <Link to="/">
                            <Button className="m-1" variant="info">Trang chủ</Button>
                        </Link>
                        <Link to="/customer/menu" className="float-end m-1" >
                            <Button variant="info">Sản phẩm</Button>
                        </Link>
                        <Link to="/customer/contact" className="float-end m-1" >
                            <Button variant="info">Liên hệ </Button>
                        </Link>

                        <Link to="/cart" className="float-end m-1" >
                            <Button variant="warning">Giỏ hàng <Badge>{numberOfItems}</Badge></Button>
                        </Link>
                    </Container>
                    <Form className="d-flex">

                        <Button
                            onClick={handleLogOut}
                            variant="danger">Đăng Xuất</Button>
                    </Form>
                </Container>
            </Navbar >



        </>
    );
};

export default CustomerHeaderComponent;
