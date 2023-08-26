import { useNavigate } from "react-router-dom";
import ContactForm from "../../components/contacts/ContactForm";

import contactApi from "../../../apis/contact.api";

function ContactCreate() {
    const navigate = useNavigate();

    const handleAdd = (product) => {
        contactApi.createContact(product)
            .then(response => {
                navigate('/admin/contacts');
            }).catch(error => {
                if (error.response.status === 401) {
                    alert(error.response.statusText);
                    navigate('/admin/login');
                } else {
                    alert(error.response.statusText);
                }
            })
    }

    return (
        <>
            <h1 className="text-white">Thêm mới liên hệ</h1>
            <ContactForm onSubmit={handleAdd} onCancel={() => navigate('/admin/contacts')} />
        </>
    );
};

export default ContactCreate;
