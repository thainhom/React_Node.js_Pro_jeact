import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFromCart, changeQuantity } from '../../store/actions/customerCartListAction';

function CartList() {
    const dispatch = useDispatch();

    const cart = useSelector(state => state.customerCartListReducer.cart);
    const total = useSelector(state => state.customerCartListReducer.total);

    const handleChange = (e, id) => {
        const quantity = Number(e.target.value)

        if (quantity > 0) {
            dispatch(changeQuantity(id, quantity))
        }
        console.log(quantity);
    }

    const handleDelete = (product_id) => {
        dispatch(deleteFromCart(product_id))
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Tên sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                    <th>Trạng thái</th>
                </tr>
            </thead>
            <tbody>
                {cart.map((item, index) => {

                    console.log("cartList", cart);
                    return (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>${item.unit_price}</td>
                            <td>
                                <Form.Control type="number" value={item.quantity} onChange={(e) => handleChange(e, item.id)} />
                            </td>
                            <td>${item.subTotal}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDelete(item.product_id)}>Xóa</Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={4}>Tổng giá đơn hàng</td>
                    <td>${total}</td>
                    <td></td>
                </tr>
            </tfoot>
        </Table>
    )
}

export default CartList
