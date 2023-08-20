import { Button } from "react-bootstrap"
import { Link } from "react-router-dom";
import { Carousel, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import CustomerPruductsList from './products/CustomerProductsList'
function CustomerHomePage() {
    const numberOfItems = useSelector(state => state.cartReducer.numberOfItems)
    const productList = useSelector(state => state.productReducer.product)
    const navigate = useNavigate()
    // const [searchKeyword, setSearchKeyword] = useState([]);
    const [filteredProductList, setFilteredProductList] = useState([]);
    console.log("filteredProductList ", filteredProductList)
    const handleLogOut = () => {
        localStorage.removeItem("userLogin");
        navigate("/login")
    }
    const renderProductList = () => {
        handleSearch("")
    }
    useEffect(() => {
        renderProductList()
    }, [])

    const handleSearch = (keyWord) => {
        if (!keyWord) {
            setFilteredProductList(productList)
        } else {
            const searchHome = productList.filter((search) => {

                return (
                    search.name.toLowerCase().includes(keyWord) ||
                    search.description.toLowerCase().includes(keyWord)
                )
            })
            setFilteredProductList(searchHome)
        }
    }
    return (
        <>
            <div>CustomerHomePage</div>

            <Link to="/admin">
                <Button variant="primary">Trang quản trị viên</Button>
            </Link>
            <Container>
                <Navbar expand="lg" className="bg-body-tertiary " style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
                    <Container fluid >
                        <Container>
                            <a href="/home">
                                <Button className=" m-1" variant="info">Trang chủ</Button>
                            </a>
                            <Link to="/cart" className="float-end m-1" >
                                <Button variant="warning">Giỏ hàng <Badge>{numberOfItems}</Badge></Button>
                            </Link>
                        </Container>
                        <Form className="d-flex">
                            <Form.Control style={{
                                width: '935px',
                            }}
                                onChange={(e) => handleSearch(e.target.value.toLowerCase())}
                                type="search"
                                placeholder="Tìm kiếm"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button
                                onClick={handleLogOut}
                                variant="outline-success">Đăng Xuất</Button>
                        </Form>
                    </Container>
                </Navbar >
                <Container>

                </Container>
                <Carousel>
                    <Carousel.Item interval={1000}>
                        <img
                            className="d-block w-100"
                            src="/img/nươc hoa 2 600.jpg"
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
                            src="/img/anh600.jpg"
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
                    productList={filteredProductList}
                />
            </Container >
        </>
    );
};

export default CustomerHomePage;
