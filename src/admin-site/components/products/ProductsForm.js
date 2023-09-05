import { useEffect } from "react";
import { useState } from "react";

import { Form, Button } from "react-bootstrap";

import ResourceNotFound from "../errors/ResourceNotFound";

import productApi from "../../../apis/product.api";

function ProductsFrom({ productId, onSubmit, onCancel }) {
    const [isEdit, setIsEdit] = useState(false);
    const [product, setProduct] = useState(null);
    const [errors, setErrors] = useState(new Map());

    useEffect(() => {
        setIsEdit(productId !== undefined);

        if (productId === undefined) {
            setProduct({
                sku: '',
                name: '',
                category: '',
                unit_price: 0,
                description: '',
                image: null
            });
        } else {
            productApi.getProductByProductId(productId)
                .then(response => {
                    setProduct({
                        ...response,
                        category: response.category || '',
                        image: null
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [productId]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === 'unit_price') {
            if (value === '' || !isNaN(parseFloat(value))) {
                setProduct({
                    ...product,
                    [name]: value === '' ? '' : parseFloat(value),
                });
            }
        } else if (name === 'image') {
            setProduct({
                ...product,
                [name]: event.target.files[0]
            })
        }
        else {
            setProduct({
                ...product,
                [name]: value,

            });

        }
    }

    const handleSubmit = async (event) => {

        event.preventDefault();

        const errors = validate();
        if (errors.size === 0) {
            const formData = new FormData();

            formData.append('sku', product.sku);
            formData.append('name', product.name);
            formData.append('category', product.category);
            formData.append('unit_price', product.unit_price);
            formData.append('description', product.description);

            if (product.image) {
                formData.append('image', product.image);
            }

            onSubmit(formData);
        } else {
            setErrors(errors);
        }
    }

    const validate = () => {
        const errors = new Map();

        if (product.sku.length > 10) {
            errors.set('sku', 'Mã sản phẩm chỉ cho phép đến 10 ký tự.');
        }

        if (product.name.length < 4 || product.name.length > 100) {
            errors.set('email', 'Địa chỉ E-mail bắt buộc nhập từ 4 đến 100 ký tự.');
        }

        if (product.category !== null && product.category.length > 20) {
            errors.set('category', ' Phân loại sản phẩm  chỉ được phép nhập nhỏ hơn 20 ký tự.');
        }

        if (!/^\d+(\.\d{0,2})?$/.test(product.unit_price)) {
            errors.set('unit_price', 'Giá tiền phải là một số hợp lệ, có tối đa 2 chữ số sau dấu thập phân.');
        }

        if (product.description.length < 2) {
            errors.set('description', 'mô tả bắt buộc nhập hơn 2 ký tự ');
        }

        return errors;
    }

    return (
        <>
            {
                product
                    ? <Form onSubmit={handleSubmit}>
                        < Form.Group className="mb-3" >
                            <Form.Label className="text-white">Mã sản phẩm <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" name="sku" value={product.sku} onChange={handleChange} disabled={isEdit} isInvalid={errors.get('sku')} />
                            <Form.Text className="text-danger">{errors.get('sku')}</Form.Text>
                        </Form.Group >

                        <Form.Group className="mb-3 text-white">
                            <Form.Label>Tên sản phẩm <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" name="name" value={product.name} onChange={handleChange} disabled={isEdit} isInvalid={errors.get('name')} />
                            <Form.Text className="text-danger">{errors.get('name')}</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3 text-white">
                            <Form.Label>Phân loại sản phẩm</Form.Label>
                            <Form.Control type="text" name="category" value={product.category} onChange={handleChange} isInvalid={errors.get('category')} />
                            <Form.Text className="text-danger">{errors.get('category')}</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3 text-white">
                            <Form.Label>Giá tiền</Form.Label>
                            <Form.Control type="text" name="unit_price" value={product.unit_price} onChange={handleChange} isInvalid={errors.get('unit_price')} />
                            <Form.Text className="text-danger">{errors.get('unit_price')}</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3 text-white ">
                            <Form.Label>Mô tả sản phẩm </Form.Label>
                            <Form.Control type="text" name="description" value={product.description} onChange={handleChange} isInvalid={errors.get('description')} />
                            <Form.Text className="text-danger">{errors.get('description')}</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3 text-white">
                            <Form.Label>Hình ảnh sản phẩm</Form.Label>
                            <Form.Control type="file" name="image" accept="image/png, image/jpeg, image/gif" onChange={handleChange} multiple />
                            <Form.Text className="text-danger">{errors.get('image')}</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3 float-end text-white">
                            <Button type="button" variant="secondary" className="m-1" onClick={onCancel}>Hủy</Button>
                            <Button type="submit" variant="success" className="m-1">Lưu</Button>
                        </Form.Group>
                    </Form >
                    : <ResourceNotFound resourceName="sản phẩm" />
            }
        </>
    );
};

export default ProductsFrom;
