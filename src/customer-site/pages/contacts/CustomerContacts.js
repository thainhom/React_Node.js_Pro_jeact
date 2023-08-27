import { Container } from 'react-bootstrap';
import CustomerHeaderComponent from "../../components/partials/CustomerHeaderComponent";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import contactApi from '../../../apis/contact.api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function CustomerContacts() {
    const [contact, setContact] = useState({
        full_name: "",
        email: "",
        content: ""
    });
    const navigate = useNavigate()
    const isLogin = useSelector(state => state.customerAuthReducer.isAuthenticate)
    const [error, setError] = useState(new Map())

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setContact(prevContact => ({
            ...prevContact,
            [name]: value
        }));
    }
    const validate = () => {
        let errors = new Map();
        if (contact.full_name.length === 0) {
            errors.set("full_name", "Tên bắt buộc phải nhập không được để trông")

        }
        if (contact.email.length === 0) {
            errors.set("email", "email bắt buộc phải nhập không được để trông")
        }
        if (contact.content.length === 0) {
            errors.set("content", "Nội dung bắt buộc phải nhập không được để trông")
        }
        return errors
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const errorsValidate = validate();
        if (errorsValidate.size !== 0) {
            setError(errorsValidate)
        }
        else if (!isLogin) {
            navigate("customer/login")
        }
        else {
            contactApi.createContact(contact).then(() => {
                alert("Cảm ơn bạn đả phản hồi cho chúng tôi ")
                navigate("/")

            })
        }
    }
    return (
        <>
            <Container>
                <CustomerHeaderComponent />
                <h2 className='text-white'>Liên hệ với chúng tôi </h2>
                <br></br>
                <h4 className='text-white text-center'>Vui lòng nhập vào biểu mẫu bên dưới</h4>




                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label className='text-white'>Tên của bạn<span className="text-danger">*</span></Form.Label>
                        <Form.Control name='full_name'
                            type="text"
                            placeholder="Nhập đầy đủ họ và tên của bạn"
                            onChange={handleChange}
                            value={contact.full_name}
                        />
                        <Form.Text className="text-danger">{error.get('full_name')}</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label className='text-white'>Email Của bạn <span className="text-danger">*</span></Form.Label>
                        <Form.Control name='email'
                            type="email"
                            placeholder="name@example.com"
                            onChange={handleChange}
                            value={contact.email}
                        />
                        <Form.Text className="text-danger">{error.get('email')}</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3 text-white" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Nội dung <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                            value={contact.content}
                            name='content'
                            as="textarea" rows={3}
                            onChange={handleChange}
                        />
                        <Form.Text className="text-danger">{error.get('content')}</Form.Text>
                    </Form.Group>
                    <Button
                        type="submit"
                        className='float-end m1'
                        variant="primary"

                    >Gửi</Button>

                </Form>



            </Container >


        </>
    )

}
export default CustomerContacts;