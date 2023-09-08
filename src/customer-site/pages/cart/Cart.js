import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CartList from '../cart/CartList';
import { checkout } from '../../store/actions/customerCartListAction';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import orderApi from '../../../apis/order.api';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const numberOfItems = useSelector(state => state.customerCartListReducer.numberOfItems)
    const cart = useSelector(state => state.customerCartListReducer.cart)
    const isAuthenticate = useSelector(state => state.customerAuthReducer.isAuthenticate);

    const [note, setNote] = useState('');

    const handleCheckout = () => {
        if (!window.localStorage.getItem('X-API-Key') || !isAuthenticate) {
            navigate('/login')
        } else {
            const isCheckout = window.confirm('Bạn có chắc chắn muốn đặt đơn hàng này ?')
            if (isCheckout) {

                orderApi.createOrder({
                    cart: cart,
                    note: note
                }).then((response) => {
                    dispatch(checkout({
                        note: note
                    }))
                    alert("Đã đặt hàng thành công")
                })
            }
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