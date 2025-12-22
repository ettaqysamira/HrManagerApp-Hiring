import axios from 'axios';
const API_URL = 'http://localhost:5076/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const employeeApi = {
    getEmployees: () => api.get('/Employees'),
    getEmployee: (id) => api.get(`/Employees/${id}`),
    createEmployee: (data) => api.post('/Employees', data),
    updateEmployee: (id, data) => api.put(`/Employees/${id}`, data),
    deleteEmployee: (id) => api.delete(`/Employees/${id}`),

    getConges: () => api.get('/Conges'),
    createConge: (data) => api.post('/Conges', data),
    updateCongeStatus: (id, status) => api.put(`/Conges/${id}/status`, { status }),
};

export const notificationApi = {
    getNotifications: () => api.get('/Notifications'),
    markAsRead: (id) => api.put(`/Notifications/${id}/read`),
    markAllAsRead: () => api.post('/Notifications/mark-all-read'),
};

export const contractApi = {
    getContracts: () => api.get('/Contracts'),
    getMyContracts: () => api.get('/Contracts/my-contracts'),
    createContract: (data) => api.post('/Contracts', data),
    updateContract: (id, data) => api.put(`/Contracts/${id}`, data),
    deleteContract: (id) => api.delete(`/Contracts/${id}`),
};

export const candidateApi = {
    getCandidats: () => api.get('/Candidats'),
};

export const presenceApi = {
    getPresences: (date, employeeId) => api.get('/Presence', { params: { date, employeeId } }),
};

export const dashboardApi = {
    getStats: () => api.get('/Dashboard/stats'),
};

export default api;
