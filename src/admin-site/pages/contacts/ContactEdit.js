import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import ProductsFrom from "../../components/products/ProductsForm";

import userApi from "../../../apis/product.api";

function ContactEdit() {
    const navigate = useNavigate();

    const { id } = useParams();

    const handleUpdate = (product) => {
        userApi.updateProduct(id, product)
            .then(() => {
                navigate('/admin/products');
            }).catch(error => {
                if (error.response.status === 401) {
                    alert(error.response.statusText);
                    navigate('/admin/login');
                } else {
                    alert(error.response.statusText);
                }
            });
    }

    return (
        <>
            <h1 className="text-white">Chỉnh sửa thông tin sản phẩm</h1>
            <ProductsFrom productId={id} onSubmit={handleUpdate} onCancel={() => navigate('/admin/products')} />
        </>
    );
};

export default ContactEdit;
