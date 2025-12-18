import api from './api';

const CandidateService = {
    getAll: async (filters = {}) => {
        let query = '/Candidats?';
        if (filters.skill) query += `skill=${encodeURIComponent(filters.skill)}&`;
        if (filters.jobOfferId) query += `jobOfferId=${filters.jobOfferId}&`;

        const response = await api.get(query);
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/Candidats/${id}`);
        return response.data;
    },

    apply: async (formData) => {
        const response = await api.post('/Candidats/apply', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }
};

export default CandidateService;
