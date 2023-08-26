import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import ContactForm from "../../components/contacts/ContactForm";

import ContactApi from "../../../apis/contact.api";

function ContactEdit() {
    const navigate = useNavigate();

    const { id } = useParams();

    const handleUpdate = (contact) => {
        ContactApi.updateContact(id, contact)
            .then(() => {
                navigate('/admin/contacts');
            }).catch(error => {
                if (error.response.status === 401) {
                    alert(error.response.statusText);
                    navigate('/admin/login');
                } else {
                    alert(error.response.statusText);
                }
            });
    }

    return (
        <>
            <h1 className="text-white">Chỉnh sửa thông tin liên hệ </h1>
            <ContactForm contactId={id} onSubmit={handleUpdate} onCancel={() => navigate('/admin/contacts')} />
        </>
    );
};

export default ContactEdit;
