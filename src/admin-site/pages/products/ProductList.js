import { Table, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment/moment";

import AdminPaginationComponent, { NUMBER_RECORDS_PER_PAGE } from "../../components/table/AdminPaginationComponent";

import userApi from "../../../apis/product.api";


function ProductList() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);

    const [searchInputValue, setSearchInputValue] = useState('');

    const [keyword, setKeyword] = useState(null);
    const [page, setPage] = useState(1);

    const [selecteProductIds, setSelecteProductIds] = useState([]);

    const fetchProducts = () => {
        userApi.searchProducts({
            name: keyword,
            page: page,
            limit: NUMBER_RECORDS_PER_PAGE,
        })
            .then(data => {

                setProducts(data.records);
                setTotal(data.total);
            }).catch(error => {
                if (error.response.status === 401) {
                    alert(error.response.statusText);
                    navigate('/admin/login');
                } else {
                    alert(error.response.statusText);
                }
            });

        setSelecteProductIds([]);
    }

    useEffect(() => {
        fetchProducts();
    }, [keyword, page]);

    const handleSearch = (event) => {
        event.preventDefault();
        setKeyword(searchInputValue);
    }

    const handleAdd = () => {
        navigate('/admin/products/new');
    }

    const handleEdit = (id) => {
        navigate(`/admin/products/${id}/edit`);
    }

    const handleBulkDelete = () => {
        const sku = products.filter(product => !!selecteProductIds.find(selecteProductId => selecteProductId === product.product_id))
            .map(product => product.sku);

        if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm [${sku}] không ?`)) {
            // TODO
            fetchProducts();
        }
    }

    const handleDelete = (id, sku) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm ${sku} không ?`)) {
            userApi.deleteProduct(id)
                .then(() => {
                    fetchProducts();
                }).catch(error => {
                    if (error.response.status === 401) {
                        alert(error.response.statusText);
                        navigate('/admin/login');
                    } else {
                        alert(error.response.statusText);
                    }
                })
        }
    }

    const changeUserIdCheckbox = (event) => {
        if (event.target.checked) {
            setSelecteProductIds([
                ...selecteProductIds,
                parseInt(event.target.value)
            ]);
        } else {
            const newselecteProductIds = selecteProductIds.filter(selecteProductId => selecteProductId !== parseInt(event.target.value));
            setSelecteProductIds(newselecteProductIds);
        }
    }

    const selectAllProductIdCheckboxes = (event) => {
        if (event.target.checked) {
            const productIds = products.map(product => product.product_id);
            setSelecteProductIds(productIds);
        } else {
            setSelecteProductIds([]);
        }
    }

    const isSelectedAllProductId = selecteProductIds.length !== 0 && selecteProductIds.length === products.length;

    return (
        <>
            <h1 className="text-white">Danh sách sản phẩm</h1>
            <Form className="row m-1 mb-3" onSubmit={handleSearch}>
                <div className="col-8">
                    <Form.Control type="text" value={searchInputValue} onChange={(event) => setSearchInputValue(event.target.value)} placeholder="Nhập từ khóa" />
                </div>
                <div className="col-4">
                    <Button type="submit" variant="info mx-1">Tìm kiếm</Button>
                    <Button type="button" variant="primary mx-1" onClick={handleAdd}>Thêm mới</Button>
                    {selecteProductIds.length !== 0 && <Button type="button" variant="danger mx-1" onClick={handleBulkDelete}>Xóa</Button>}
                </div>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th><Form.Check type="checkbox" onChange={selectAllProductIdCheckboxes} checked={isSelectedAllProductId} /></th>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Phân loại sản phẩm</th>
                        <th>Giá tiền</th>
                        <th>Mô tả sản phấn</th>
                        <th>Thời gian tạo</th>
                        <th>Thời gian cập nhật</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => {
                        console.log(products);
                        return (
                            <tr key={index}>
                                <td>
                                    <Form.Check type="checkbox" name="product_id" id={'product_id-' + product.product_id} value={product.product_id} onChange={changeUserIdCheckbox} checked={selecteProductIds.find(product_id => product_id === product.product_id)} />
                                </td>
                                <td>{product.sku}</td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.unit_price}</td>
                                <td>{product.description}</td>
                                <td>{moment(product.created_at).format('YYYY-MM-DD HH:mm')}</td>
                                <td>{moment(product.updated_at).format('YYYY-MM-DD HH:mm')}</td>
                                <td>
                                    <Button variant="warning" className="m-1" onClick={() => handleEdit(product.product_id)}>Sửa</Button>
                                    <Button variant="danger" className="m-1" onClick={() => handleDelete(product.product_id, product.sku)}>Xóa</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <AdminPaginationComponent total={total} setPage={setPage} />
        </>
    );
};

export default ProductList;
