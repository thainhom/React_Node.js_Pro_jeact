import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import OrderForm from "../../components/orders/OrderForm";

import orderApi from "../../../apis/order.api";

function OrderEdit() {
    const navigate = useNavigate();

    const { id } = useParams();

    const handleUpdate = (order) => {
        orderApi.updateOrder(id, order)
            .then(() => {
                navigate('/admin/orders');
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
            <h1 className="text-white">Chỉnh sửa thông tin đơn hàng</h1>
            <OrderForm orderId={id} onSubmit={handleUpdate} onCancel={() => navigate('/admin/orders')} />
        </>
    );
};

export default OrderEdit;
