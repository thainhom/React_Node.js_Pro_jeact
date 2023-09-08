import { useEffect } from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import ResourceNotFound from "../errors/ResourceNotFound";
import contactApi from "../../../apis/contact.api";

function ContactForm({ contactId, onSubmit, onCancel }) {
    const [isEdit, setIsEdit] = useState(false);
    const [contact, setContact] = useState(null);
    const [errors, setErrors] = useState(new Map());

    useEffect(() => {
        setIsEdit(contactId !== undefined);

        if (contactId === undefined) {
            setContact({
                full_name: '',
                email: '',
                content: '',
                status: 0,

            });
        } else {
            contactApi.getContactByContactId(contactId)
                .then(response => {
                    setContact({
                        ...response,

                    });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [contactId]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === "status") {
            if (value === '' || !isNaN(parseFloat(value))) {
                setContact({
                    ...contact,
                    [name]: value === '' ? '' : parseFloat(value),
                });
            }
        } else {
            setContact({
                ...contact,
                [name]: value,
            });
        }
    }

    const handleSubmit = async (event) => {

        event.preventDefault();

        const errors = validate();
        if (errors.size === 0) {


            onSubmit(contact);
        } else {
            setErrors(errors);
        }
    }

    const validate = () => {
        const errors = new Map();

        if (contact.full_name.length === 0) {
            errors.set('full_name', 'Tên người liên hệ  không được để trống');
        }

        if (contact.email.length < 4 || contact.email > 50) {
            errors.set('email', 'Email chỉ cho phép 4 đến 50 ký tự.');
        }
        if (!/^\d+(\.\d[0-9])?$/.test(contact.status)) {
            errors.set('total_price', 'Trạng thái là một số hợp lệ');
        }


        return errors;
    }

    return (
        <>
            {
                contact
                    ? <Form onSubmit={handleSubmit}>
                        < Form.Group className="mb-3" >
                            <Form.Label className="text-white">Tên người liên hệ  <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" name="full_name" value={contact.full_name} onChange={handleChange} disabled={isEdit} isInvalid={errors.get('full_name')} />
                            <Form.Text className="text-danger">{errors.get('full_name')}</Form.Text>
                        </Form.Group >

                        <Form.Group className="mb-3 text-white">
                            <Form.Label>Email người liên hệ <span className="text-danger">*</span>  </Form.Label>
                            <Form.Control type="email" name="email" value={contact.email} onChange={handleChange} disabled={isEdit} isInvalid={errors.get('email')} />
                            <Form.Text className="text-danger">{errors.get('email')}</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3 text-white">
                            <Form.Label>Nội dung người liên hệ </Form.Label>
                            <Form.Control type="text" name="content" value={contact.content} onChange={handleChange} isInvalid={errors.get('content')} />
                            <Form.Text className="text-danger">{errors.get('content')}</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3 text-white">
                            <Form.Label className="mr-5">Trạng thái liên hệ  </Form.Label>
                            <div className="px-3">
                                <Form.Check inline type="radio" name="status" label="Liên hệ mới" id="status-1" value={1} checked={contact.status === 1} onChange={handleChange} />
                                <Form.Check inline type="radio" name="status" label="Đã nhận" id="status-2" value={2} checked={contact.status === 2} onChange={handleChange} />
                                <Form.Check inline type="radio" name="status" label="Bị từ chôi" id="status-3" value={3} checked={contact.status === 3} onChange={handleChange} />

                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3 float-end text-white">
                            <Button type="button" variant="secondary" className="m-1" onClick={onCancel}>Hủy</Button>
                            <Button type="submit" variant="success" className="m-1">Lưu</Button>
                        </Form.Group>
                    </Form >
                    : <ResourceNotFound resourceName="Liên hệ " />
            }
        </>
    );
};

export default ContactForm;
