import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import authApi from "../../../apis/auth.api";
import { logout } from "../../store/actions/customerAuthAction";

function CustomerHeaderComponent() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isAuthenticate = useSelector(state => state.customerAuthReducer.isAuthenticate);
    const numberOfItems = useSelector(state => state.customerCartListReducer.numberOfItems);

    const handleLogOut = () => {
        authApi.logout()
            .then(() => {
                dispatch(logout())
                navigate("/login")
            }).catch(error => {
                console.error(error);
            });
    }

    return (
        <>
            <Navbar expand="lg"
                className="bg-body-tertiary "
                style={{
                    position: 'sticky', top: 0, zIndex: 1000,
                    backgroundImage: "url('https://anhdepfree.com/wp-content/uploads/2022/01/background-3d-4k_529380.jpg')",
                    backgroundSize: 'cover'

                }}
            >
                <Container fluid >
                    <Container>
                        <Link to="/">
                            <Button className="m-1" variant="info">Trang chủ</Button>
                        </Link>
                        <Link to="/products" className="float-end m-1" >
                            <Button variant="info">Sản phẩm</Button>
                        </Link>
                        <Link to="/contact" className="float-end m-1" >
                            <Button variant="info">Liên hệ </Button>
                        </Link>

                        <Link to="/cart" className="float-end m-1" >
                            <Button variant="warning">Giỏ hàng <Badge>{numberOfItems}</Badge></Button>
                        </Link>
                    </Container>
                    {!isAuthenticate && <Link style={{ width: '120px' }} to="/login" className="float-end m-1" >
                        <Button variant="danger">Đăng nhập</Button>
                    </Link>}
                    {isAuthenticate && <Button
                        style={{ width: '120px' }}
                        onClick={handleLogOut}
                        variant="danger">Đăng xuất</Button>}
                </Container>
            </Navbar >
        </>
    );
};

export default CustomerHeaderComponent;
