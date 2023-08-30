import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CartList from '../cart/CartList';
import { checkout } from '../../store/actions/customerCartListAction';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import orderApi from '../../../apis/order.api';

function Cart() {
    const dispatch = useDispatch();

    const numberOfItems = useSelector(state => state.customerCartListReducer.numberOfItems)
    const orders = useSelector(state => state.customerCartListReducer.cart)
    const total_price = useSelector(state => state.customerCartListReducer.total)

    const [note, setNote] = useState('');

    const handleCheckout = () => {
        const isCheckout = window.confirm('Bạn có chắc chắn muốn đặt đơn hàng này ?')

        orderApi.createOrder({
            ...orders,
            total_price,
            note
        }).then((response) => {
            alert("Đã đặt hàng thành công")
        })
        if (isCheckout) {
            dispatch(checkout({
                note: note
            }))
        }
    }

    return (
        <div>
            <h1 className='text-white text-center mt-3'>Giỏ hàng của bạn</h1>
            <CartList />

            {numberOfItems > 0
                ? (
                    <>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className="text-white">Ghi chú</Form.Label>
                            <Form.Control as="textarea" rows={3} value={note} onChange={(e) => setNote(e.target.value)} />
                        </Form.Group>
                        <div className="float-end">
                            <Button variant="success" onClick={handleCheckout}>Đặt hàng</Button>
                        </div>
                    </>
                )
                : null}
        </div>
    )
}

export default Cart