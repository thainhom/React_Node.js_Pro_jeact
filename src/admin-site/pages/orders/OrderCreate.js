import { useNavigate } from "react-router-dom";
import OrderFrom from '../../components/orders/OrderForm'

import orderApi from "../../../apis/order.api";

function OrderCreate() {
    const navigate = useNavigate();

    const handleAdd = (order) => {
        orderApi.createOrder(order)
            .then(response => {
                navigate('/admin/orders');
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
            <h1 className="text-white">Thêm mới đơn hàng</h1>
            <OrderFrom onSubmit={handleAdd} onCancel={() => navigate('/admin/orders')} />
        </>
    );
};

export default OrderCreate;
