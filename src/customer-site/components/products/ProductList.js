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
    const [orderPrice, setOrderPrice] = useState("ASC");
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([]);
    const rows = getRows(products);

    const fetchProducts = () => {
        productApi.searchProducts({
            name: keyword,
            page: page,
            orderPrice: orderPrice,
            limit: NUMBER_RECORDS_PER_PAGE,
            categories: categories,
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
    }, [keyword, page, orderPrice, categories]);

    const handleSearch = (event) => {
        event.preventDefault();
        setKeyword(searchInputValue);


    }

    const handleChangeCategory = (event) => {
        if (event.target.checked) {
            setCategories([
                ...categories,
                event.target.value

            ])
        } else {
            const categoryValue = categories.filter(category => category !== event.target.value)
            setCategories(categoryValue)
        }

      
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
                    {props.isShowSort && <Form.Select className="w-50" aria-label="Default select example" value={orderPrice} onChange={(e) => setOrderPrice(e.target.value)}>
                        <option value="ASC">Giá tăng dần</option>
                        <option value="DESC">Giá giảm dần</option>
                    </Form.Select>}
                </div>
                {props.isShowCategory && ['Burberry', 'dior', 'CHANEL'].map((category) => (
                    <Form.Check
                        value={category}
                        name="category"
                        className='text-white'
                        type='checkbox'
                        id={category}
                        label={category}
                        inline={true}
                        onChange={handleChangeCategory}

                    />
                ))}

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
