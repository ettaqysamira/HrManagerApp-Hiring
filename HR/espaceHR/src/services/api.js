import axios from 'axios';
const API_URL = 'http://localhost:5076/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const employeeApi = {
    getAllEmployees: () => api.get('/employees'),
    createEmployee: (data) => api.post('/employees', data),
    getEmployee: (id) => api.get(`/employees/${id}`),
    updateEmployee: (id, data) => api.put(`/employees/${id}`, data),
    deleteEmployee: (id) => api.delete(`/employees/${id}`),
};

export default api;
