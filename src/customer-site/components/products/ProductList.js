import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import ProductDetail from './ProductDetail';
import { useEffect, useState } from 'react';
import productApi from '../../../apis/product.api';
import CustomerPaginationComponent, { NUMBER_RECORDS_PER_PAGE } from '../../components/table/CustomerPaginationComponent';

const getRows = (products) => {
    let rows = [];
    let row = [];

    for (const product of products) {
        row.push(product)

        if (row.length === 3) {
            rows.push(row)
            row = []
        }
    }

    if (row.length !== 0) {
        rows.push(row)
    }

    return rows
}

function ProductList(props) {
    const navigate = useNavigate();

    const [searchInputValue, setSearchInputValue] = useState('');
    const [total, setTotal] = useState(0);
    const [keyword, setKeyword] = useState(null);
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([])
    const [selectedBrands, setSelectedBrands] = useState(['BURBERRY', 'DIOR', 'CHANEL']);
    const rows = getRows(products)
    const fetchProducts = () => {
        productApi.searchProducts({
            name: keyword,
            page: page,
            limit: NUMBER_RECORDS_PER_PAGE,
        }).then(data => {

            setProducts(data.records);
            setTotal(data.total);
        }).catch(error => {
            if (error.response.status === 401) {
                alert(error.response.statusText)
                navigate("/login")
            } else {
                alert(error.response.statusText)
            }
        })

    }

    useEffect(() => {
        fetchProducts();
    }, [keyword, page]);

    const handleSearch = (event) => {
        event.preventDefault();
        setKeyword(searchInputValue);
    }

    return (
        <>
            <Form onSubmit={handleSearch}>
                <div className="d-flex mb-3">
                    <Form.Control
                        type="text"
                        value={searchInputValue}
                        onChange={(event) => setSearchInputValue(event.target.value)}
                        placeholder="Nhập từ khóa"
                    />
                    <div className="col-4">
                        <Button type="submit" variant="info mx-1">Tìm kiếm</Button>
                    </div>
                    {props.isShowSort && <Form.Select className="w-50" aria-label="Default select example">
                        <option>Lọc giá</option>
                        <option value="1">Tăng dần</option>
                        <option value="2">Giảm dần</option>
                    </Form.Select>}
                </div>
                {props.isShowCategory && ['BURBERRY', 'DIOR', 'CHANEL',].map((brand) => (
                    <Form.Check
                        name={brand}
                        className='text-white'
                        type='checkbox'
                        id={brand}
                        label={brand}
                        inline={true}
                    />
                ))}
                <div>
                </div>
            </Form><br></br>
            {rows.map((row, index) => {
                return (
                    <Row key={index}>
                        {row.map((product, index) => {
                            return (
                                <Col key={index}>
                                    <ProductDetail
                                        product={product}
                                    />
                                </Col>
                            )
                        })}
                    </Row>
                )

            })}
            <br></br>

            <CustomerPaginationComponent total={total} setPage={setPage} />
        </>
    )
}

export default ProductList
