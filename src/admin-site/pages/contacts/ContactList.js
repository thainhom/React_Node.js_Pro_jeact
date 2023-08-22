import { Table, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment/moment";

import AdminPaginationComponent, { NUMBER_RECORDS_PER_PAGE } from "../../components/table/AdminPaginationComponent";

import contactApi from "../../../apis/contact.api";


function ContactList() {
    const navigate = useNavigate();

    const [contacts, setContacts] = useState([]);
    const [total, setTotal] = useState(0);

    const [searchInputValue, setSearchInputValue] = useState('');

    const [keyword, setKeyword] = useState(null);
    const [page, setPage] = useState(1);

    const [selecteContactIds, setSelecteContactIds] = useState([]);

    const fetchContacts = () => {
        contactApi.searchContacts({
            name: keyword,
            page: page,
            limit: NUMBER_RECORDS_PER_PAGE,
        })
            .then(data => {

                setContacts(data.records);
                setTotal(data.total);
            }).catch(error => {
                if (error.response.status === 401) {
                    alert(error.response.statusText);
                    navigate('/admin/login');
                } else {
                    alert(error.response.statusText);
                }
            });

        setSelecteContactIds([]);
    }

    useEffect(() => {
        fetchContacts();
    }, [keyword, page]);

    const handleSearch = (event) => {
        event.preventDefault();
        setKeyword(searchInputValue);
    }

    const handleAdd = () => {
        navigate('/admin/contacts/new');
    }

    const handleEdit = (id) => {
        navigate(`/admin/contacts/${id}/edit`);
    }

    const handleBulkDelete = () => {
        const full_name = contacts.filter(contact => !!selecteContactIds.find(selecteContactId => selecteContactId === contact.contact_id))
            .map(contact => contact.full_name);

        if (window.confirm(`Bạn có chắc chắn muốn xóa liên hệ[${full_name}] không ?`)) {
            // TODO
            fetchContacts();
        }
    }

    const handleDelete = (id, full_name) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa liên hệ ${full_name} không ?`)) {
            contactApi.deleteContact(id)
                .then(() => {
                    fetchContacts();
                }).catch(error => {
                    if (error.response.status === 401) {
                        alert(error.response.statusText);
                        navigate('/admin/login');
                    } else {
                        alert(error.response.statusText);
                    }
                })
        }
    }

    const changeUserIdCheckbox = (event) => {
        if (event.target.checked) {
            setSelecteContactIds([
                ...selecteContactIds,
                parseInt(event.target.value)
            ]);
        } else {
            const newSelecteContactIds = selecteContactIds.filter(selecteContactId => selecteContactId !== parseInt(event.target.value));
            setSelecteContactIds(newSelecteContactIds);
        }
    }

    const selectAllProductIdCheckboxes = (event) => {
        if (event.target.checked) {
            const contactIds = contacts.map(contact => contact.contact_id);
            setSelecteContactIds(contactIds);
        } else {
            setSelecteContactIds([]);
        }
    }

    const isSelectedAllProductId = selecteContactIds.length !== 0 && selecteContactIds.length === contacts.length;

    return (
        <>
            <h1 className="text-white">Danh sách Liên hệ</h1>
            <Form className="row m-1 mb-3" onSubmit={handleSearch}>
                <div className="col-8">
                    <Form.Control type="text" value={searchInputValue} onChange={(event) => setSearchInputValue(event.target.value)} placeholder="Nhập từ khóa" />
                </div>
                <div className="col-4">
                    <Button type="submit" variant="info mx-1">Tìm kiếm</Button>
                    <Button type="button" variant="primary mx-1" onClick={handleAdd}>Thêm mới</Button>
                    {selecteContactIds.length !== 0 && <Button type="button" variant="danger mx-1" onClick={handleBulkDelete}>Xóa</Button>}
                </div>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th><Form.Check type="checkbox" onChange={selectAllProductIdCheckboxes} checked={isSelectedAllProductId} /></th>
                        <th>Tên người liên hệ</th>
                        <th>email người liên hệ </th>
                        <th>nội dung người liên hệ </th>
                        <th>Trạng thái</th>
                        <th>Thời gian tạo</th>
                        <th>Thời gian cập nhật</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact, index) => {
                        console.log(contacts);
                        return (
                            <tr key={index}>
                                <td>
                                    <Form.Check type="checkbox" name="contact_id" id={'contact_id-' + contact.contact_id} value={contact.contact_id} onChange={changeUserIdCheckbox} checked={selecteContactIds.find(contact_id => contact_id === contact.contact_id)} />
                                </td>
                                <td>{contact.full_name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.content}</td>
                                <td>{contact.status}</td>

                                <td>{moment(contact.created_at).format('YYYY-MM-DD HH:mm')}</td>
                                <td>{moment(contact.updated_at).format('YYYY-MM-DD HH:mm')}</td>
                                <td>
                                    <Button variant="warning" className="m-1" onClick={() => handleEdit(contact.contact_id)}>Sửa</Button>
                                    <Button variant="danger" className="m-1" onClick={() => handleDelete(contact.contact_id, contact.full_name)}>Xóa</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <AdminPaginationComponent total={total} setPage={setPage} />
        </>
    );
};

export default ContactList;
