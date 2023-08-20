import { useNavigate } from "react-router-dom";
import ProductsForm from "../../components/products/ProductsForm";

import userApi from "../../../apis/product.api";

function ProductCreate() {
    const navigate = useNavigate();

    const handleAdd = (product) => {
        userApi.createProduct(product)
            .then(response => {
                navigate('/admin/products');
            }).catch(error => {
                if (error.response.status === 401) {
                    alert(error.response.statusText);
                    navigate('/admin/login');
                } else {
                    alert(error.response.statusText);
                }
            })
    }

    return (
        <>
            <h1 className="text-white">Thêm mới sản phẩm</h1>
            <ProductsForm onSubmit={handleAdd} onCancel={() => navigate('/admin/products')} />
        </>
    );
};

export default ProductCreate;
