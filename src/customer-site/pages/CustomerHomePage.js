// import { Button } from "react-bootstrap"
// import { Link } from "react-router-dom";
// import Form from 'react-bootstrap/Form';
// import Navbar from 'react-bootstrap/Navbar';
// import Badge from 'react-bootstrap/Badge';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import { Carousel, Container } from 'react-bootstrap';
import CustomerFooterComponent from "../components/partials/CustomerFooterComponent";
import CustomerPruductsList from './products/CustomerProductsList'
import CustomerHeaderComponent from "../components/partials/CustomerHeaderComponent";
// import authApi from "../../apis/auth.api";
// import { logout } from "../store/actions/customerAuthAction";
function CustomerHomePage() {
    // const numberOfItems = useSelector(state => state.customerCartListReducer.numberOfItems)
    // const navigate = useNavigate()
    // const dispatch = useDispatch()
    // const handleLogOut = () => {
    //     authApi.logout().then(response => {
    //         dispatch(logout())
    //         navigate("/customer/login")
    //     }).catch(error => {
    //         console.error(error);
    //     })
    // }

    return (
        <>

            <Container>
                {/* <Navbar expand="lg"
                    className="bg-body-tertiary "
                    style={{
                        position: 'sticky', top: 0, zIndex: 1000,
                        backgroundImage: "url('https://tophinhanhdep.com/wp-content/uploads/2021/10/4k-Color-Wallpapers.jpg')",
                        backgroundSize: 'cover'

                    }}

                >
                    <Container fluid >
                        <Container>
                            <a href="/">
                                <Button className="m-1" variant="info">Trang chủ</Button>
                            </a>
                            <Link to="/*" className="float-end m-1" >
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
                </Navbar > */}
                <CustomerHeaderComponent />
                <Container>

                </Container>
                <Carousel>
                    <Carousel.Item interval={1000}>
                        <img
                            className="d-block w-100"

                            src="/img/anh600.jpg"
                            alt="Dior"
                        />
                        <Carousel.Caption>
                            <h3 style={{ color: "red" }}>Dior </h3>
                            <p  >Nước Hoa Nam Dior Sauvage Parfum 100ml.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={500}>
                        <img
                            className="d-block w-100"
                            src="/img/nươc hoa 2 600.jpg"
                            alt="Channel"
                        />
                        <Carousel.Caption>
                            <h3 style={{ color: "Blue" }}>Channel </h3>
                            <p >Nước Hoa Chanel Bleu Gel De Douche 100ml.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/img/nuoc hoa burberry.jpg"
                            alt="Burberry"
                        />
                        <Carousel.Caption>
                            <h3 style={{ color: "pink" }}>Burberry </h3>
                            <p>
                                Nước Hoa Burberry Tudor Rose 100ml.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <br></br>
                <h1 style={{ color: "white" }} className='text-center'>Danh sách sản phẩm</h1>

                <CustomerPruductsList

                />
                <CustomerFooterComponent />
            </Container >
        </>
    );
};

export default CustomerHomePage;
