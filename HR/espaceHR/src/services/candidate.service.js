import api from './api';

const CandidateService = {
    getAll: async (filters = {}) => {
        let query = '/Candidats?';
        if (filters.skill) query += `skill=${encodeURIComponent(filters.skill)}&`;
        if (filters.jobOfferId) query += `jobOfferId=${filters.jobOfferId}&`;
        if (filters.searchInCv) query += `searchInCv=${encodeURIComponent(filters.searchInCv)}&`;
        if (filters.minExperience !== null && filters.minExperience !== undefined) query += `minExperience=${filters.minExperience}&`;

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
    },

    acceptCandidate: async (id, interviewDate) => {
        const response = await api.put(`/Candidats/${id}/accept`, interviewDate, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    },

    rejectCandidate: async (id) => {
        const response = await api.put(`/Candidats/${id}/reject`);
        return response.data;
    }
};

export default CandidateService;
