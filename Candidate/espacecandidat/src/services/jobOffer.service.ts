import axios from 'axios';
const API_URL = 'http://localhost:5169/api/OffresEmploi';

const JobOfferService = {
    getAll: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error fetching job offers:", error);
            throw error;
        }
    },

    getById: async (id: number) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching job offer ${id}:`, error);
            throw error;
        }
    }
};

export default JobOfferService;
