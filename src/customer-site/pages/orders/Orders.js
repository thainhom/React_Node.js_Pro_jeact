

import { Table } from "react-bootstrap"
import moment from "moment"
function Orders() {
    const orders = window.localStorage.getItem('orders') ? JSON.parse(window.localStorage.getItem('orders')) : [];
    
    return (
        <>
            <h1 className="text-center text-white m-3" >Lịch sử đơn hàng</h1>
            <Table striped bordered hover variant="dark">
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
                        orders.map((item, index) => {
                            console.log(orders);
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.serial_number} </td>
                                    <td>{moment(item.order_at).format('YYYY-MM-DD HH:mm')}</td>
                                    <td>{item.total_price} </td>
                                    <td>{item.status} </td>


                                </tr>

                            )



                        })
                    }


                </tbody>
            </Table>

        </>
    )

}
export default Orders