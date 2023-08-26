import { useEffect } from "react";
import { useState } from "react";

import { Form, Button } from "react-bootstrap";

import ResourceNotFound from "../errors/ResourceNotFound";

import orderApi from "../../../apis/order.api";

function OrderForm({ orderId, onSubmit, onCancel }) {
    const [isEdit, setIsEdit] = useState(false);
    const [order, setOrder] = useState(null);
    const [errors, setErrors] = useState(new Map());

    useEffect(() => {
        setIsEdit(orderId !== undefined);

        if (orderId === undefined) {
            setOrder({
                serial_number: '',
                user_id: '',
                total_price: '',
                status: 0,
                note: '',
            });
        } else {
            orderApi.getOrderByOrderId(orderId)
                .then(response => {
                    setOrder({
                        ...response,

                    });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [orderId]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === 'total_price' || name === "status") {
            if (value === '' || !isNaN(parseFloat(value))) {
                setOrder({
                    ...order,
                    [name]: value === '' ? '' : parseFloat(value),
                });
            }
        } else {
            setOrder({
                ...order,
                [name]: value,
            });
        }
    }

    const handleSubmit = async (event) => {

        event.preventDefault();

        const errors = validate();
        if (errors.size === 0) {
            onSubmit(order);
        } else {
            setErrors(errors);
        }
    }

    const validate = () => {
        const errors = new Map();

        if (order.serial_number.length === 0) {
            errors.set('serial_number', 'Mã đơn hàng không được để trống');
        }

        if (!/^\d+(\.\d{0,2})?$/.test(order.total_price)) {
            errors.set('total_price', 'Giá tiền phải là một số hợp lệ, có tối đa 2 chữ số sau dấu thập phân.');
        }



        if (!/^\d+(\.\d{0,2})?$/.test(order.status)) {
            errors.set('status', 'Trạng thái đơn hàng là một số hợp lệ của admin đưa ra  ');
        }

        if (order.note.length > 100) {

            errors.set('note', 'bạn đả ghi chú quá giới hạn cho phép ');
        }

        return errors;
    }

    return (
        <>
            {
                order
                    ? <Form onSubmit={handleSubmit}>
                        < Form.Group className="mb-3" >
                            <Form.Label className="text-white">Mã đơn hàng <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" name="serial_number" value={order.serial_number} onChange={handleChange} disabled={isEdit} isInvalid={errors.get('serial_number')} />
                            <Form.Text className="text-danger">{errors.get('serial_number')}</Form.Text>
                        </Form.Group >

                        <Form.Group className="mb-3 text-white">
                            <Form.Label>Tổng giá đơn hàng </Form.Label>
                            <Form.Control type="text" name="total_price" value={order.total_price} onChange={handleChange} disabled={isEdit} isInvalid={errors.get('total_price')} />
                            <Form.Text className="text-danger">{errors.get('total_price')}</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3 text-white">
                            <Form.Label>Trạng thái đơn hàng</Form.Label>
                            <Form.Control type="text" name="status" value={order.status} onChange={handleChange} isInvalid={errors.get('status')} />
                            <Form.Text className="text-danger">{errors.get('status')}</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3 text-white">
                            <Form.Label>ghi chú</Form.Label>
                            <Form.Control type="text" name="note" value={order.note} onChange={handleChange} isInvalid={errors.get('note')} />
                            <Form.Text className="text-danger">{errors.get('note')}</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3 float-end text-white">
                            <Button type="button" variant="secondary" className="m-1" onClick={onCancel}>Hủy</Button>
                            <Button type="submit" variant="success" className="m-1">Lưu</Button>
                        </Form.Group>
                    </Form >
                    : <ResourceNotFound resourceName="Đơn hàng" />
            }
        </>
    );
};

export default OrderForm;
