import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './../../store/actions/customerCartListAction';
import { getStaticResourceUrl } from '../../utilities';
import { useNavigate } from 'react-router-dom';
const CustomerProductsDetail = ({ product, items, setDisPlayitems }) => {
    const isLogin = useSelector(state => state.customerAuthReducer.isAuthenticate)
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleChangeQuantity = (event) => {
        const value = Number(event.target.value)

        if (value > 0) {
            setQuantity(value)
        }
    }

    const handleAdd = () => {
        if (isLogin) {
            dispatch(addToCart({
                ...product,
                quantity: quantity,
            }))
        } else {
            navigate("customer/login")
        }



    }
    return (

        <Card>
            <Card.Img variant="top" src={getStaticResourceUrl(product.image)} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Badge bg="secondary">${product.unit_price}</Badge>
                <Card.Text>{product.description}</Card.Text>
                <Stack direction="horizontal" gap={3}>
                    <Form.Control type="number" value={quantity} onChange={handleChangeQuantity} min={1} />
                    <Button variant="primary" onClick={handleAdd}>Thêm</Button>
                </Stack>
            </Card.Body>
        </Card>
    )
}
export default CustomerProductsDetail