import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import OrderForm from "../../components/orders/OrderForm";

import orderApi from "../../../apis/order.api";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";


function OrderEdit() {
    const [orderDetail, setOrderDetail] = useState([])

    const navigate = useNavigate();

    const { id } = useParams();

    const getEffect = () => {

        orderApi.getOrderByOrderId(id)
            .then((data) => {
                console.log(111111111, data);
                setOrderDetail(data.order_details);
                console.log(22222222222, (data.order_details));

            })
            .catch((error) => {
                if (error.response.status === 401) {
                    alert(error.response.statusText);
                    navigate('/admin/login');
                } else {
                    alert(error.response ? error.response.statusText : "Error occurred");
                }
            });

    }
    useEffect(() => {
        getEffect()
    }, [id])



    const handleUpdate = (order) => {
        orderApi.updateOrder(id, order)
            .then(() => {
                navigate('/admin/orders');
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    alert(error.response.statusText);
                    navigate('/admin/login');
                } else {
                    alert(error.response ? error.response.statusText : "Error occurred");
                }
            });
    }


    const handleDeleteOrderDetail = (order_detail_id) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa đơn hàng ${order_detail_id} không ?`)) {
            orderApi.deleteOrderDtail(order_detail_id).then(() => {
                getEffect()
            }).catch((error) => {
                if (error.response && error.response.status === 401) {
                    alert(error.response.statusText)
                    navigate('/admin/login');

                } else {
                    alert(error.response ? error.response.statusText : "Error occurred");
                }
            })
        }



    };


    return (
        <>
            <h1 className="text-white">Chỉnh sửa thông tin đơn hàng</h1>
            <OrderForm orderId={id} onSubmit={handleUpdate} onCancel={() => navigate('/admin/orders')} />
            <h2 className="text-white">Chi tiết đơn hàng</h2>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th> ID người đặt hàng</th>
                        <th> Id chi tiết đặt hàng</th>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Đơn giá </th>
                        <th>Tổng giá trên sản phẩm </th>
                        <th>Action </th>

                    </tr>
                </thead>
                <tbody>

                    {orderDetail.map((item, index) => {
                        console.log(orderDetail);
                        return (

                            <tr key={index}>

                                <td>{item.order_id} </td>
                                <td>{item.order_detail_id} </td>
                                <td>{item.sku} </td>
                                <td>{item.name} </td>
                                <td>{item.quantity} </td>
                                <td>{item.unit_price} </td>
                                <td>{item.sub_total_price
                                } </td>
                                <td>{

                                    <button type="submit" onClick={() => handleDeleteOrderDetail(item.order_detail_id)} className="btn btn-danger m-1">Xóa</button>

                                } </td>

                            </tr>

                        )
                    })}

                </tbody>
            </Table >

        </>
    );
};

export default OrderEdit;
