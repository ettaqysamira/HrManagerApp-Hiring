import api from './api';

const JobOfferService = {
    getAll: async () => {
        const response = await api.get('/OffresEmploi');
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/OffresEmploi/${id}`);
        return response.data;
    },

    create: async (data) => {
        const response = await api.post('/OffresEmploi', data);
        return response.data;
    },

    update: async (id, data) => {
        const response = await api.put(`/OffresEmploi/${id}`, data);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/OffresEmploi/${id}`);
        return response.data;
    }
};

export default JobOfferService;
