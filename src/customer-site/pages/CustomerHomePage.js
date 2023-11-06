import { Carousel } from 'react-bootstrap';
import ProductList from '../components/products/ProductList';

function CustomerHomePage() {
    return (
        <>
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
            <h1 style={{ color: "white" }} className='text-center'>Danh sách sản phẩm list</h1>

            <ProductList />
        </>
    );
};

export default CustomerHomePage;
