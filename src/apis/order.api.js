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
    return await api.postForm('/orders', requestBody, { headers: getHeaders() })
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
    return await api.putForm(`/orders/${orderId}`, requestBody, { headers: getHeaders() })
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

export default {
    searchOrders,
    createOrder,
    getOrderByOrderId,
    updateOrder,
    deleteOrder,
};
