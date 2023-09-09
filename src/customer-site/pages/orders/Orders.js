import { useEffect, useState } from "react"
import orderApi from "../../../apis/order.api"
import { useParams } from "react-router-dom"
import { Table } from "react-bootstrap"
import moment from "moment"
function Orders() {
    // const [historyOrders, setHisstoryOrder] = useState([])
    // const { id } = useParams()
    // useEffect(() => {
    //     orderApi.getOrderByOrderId(id).then((data) => {
    //         setHisstoryOrder(data)
    //         console.log(data.order_details);
    //     }).catch((error) => {
    //         if (error.response.status === 401) {
    //             alert(error.response.statusText);


    //         } else {
    //             alert(error.response ? error.response.statusText : "Error occurred");
    //         }
    //     });
    // }, []);

    return (
        <>
            <h1 className="text-center text-white m-3" >Lịch sử đơn hàng</h1>
            {/* <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Mã đơn hàng</th>
                        <th>Thời gian đặt</th>
                        <th>Tổng giá</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        historyOrders.map((item, index) => {
                            console.log(historyOrders);
                            <tr key={index}>
                                <td>{item.order_id}</td>
                                <td>{item.serial_number} </td>
                                <td>{moment(item.order_at).format('YYYY-MM-DD HH:mm')}</td>
                                <td>{item.total_price} </td>
                                <td>{item.status} </td>


                            </tr>

                        })
                    }


                </tbody>
            </Table> */}

        </>
    )

}
export default Orders