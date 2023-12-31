import api, { getHeaders } from './api';

const searchOrders = async (params = {}) => {
    return await api.get('/orders', { params: params, headers: getHeaders() })
        .then(response => {
            return response.data;
        }).catch(error => {
            console.error('API Error', error);
            throw error;
        });
}

const createOrder = async (requestBody) => {
    return await api.post('/orders', requestBody, { headers: getHeaders() })
        .then(response => {
            return response.data;
        }).catch(error => {
            console.error('API Error', error);
            throw error;
        });
}

const getOrderByOrderId = async (orderId) => {
    return await api.get(`/orders/${orderId}`, { headers: getHeaders() })
        .then(response => {
            return response.data;
        }).catch(error => {
            console.error('API Error', error);
            throw error;
        });
}

const updateOrder = async (orderId, requestBody) => {
    return await api.put(`/orders/${orderId}`, requestBody, { headers: getHeaders() })
        .then(response => {
            return response.data;
        }).catch(error => {
            console.error('API Error', error);
            throw error;
        });
}

const deleteOrder = async (orderId) => {
    return await api.delete(`/orders/${orderId}`, { headers: getHeaders() })
        .then(response => {
            return response.data;
        }).catch(error => {
            console.error('API Error', error);
            throw error;
        });
}
const deleteOrderDtail = async (order_detail_id) => {
    return await api.delete(`/order_details/${order_detail_id}`, { headers: getHeaders() })
        .then(response => {
            return response.data;
        }).catch(error => {
            console.error('API Error', error);
            throw error;
        });
}


export default {
    searchOrders,
    createOrder,
    getOrderByOrderId,
    updateOrder,
    deleteOrder,
    deleteOrderDtail
};
