import axios from 'axios';
const API_URL = 'http://localhost:5076/api/Candidats';

const CandidateService = {
    apply: async (formData: FormData) => {
        try {
            const response = await axios.post(`${API_URL}/apply`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error applying:", error);
            throw error;
        }
    }
};

export default CandidateService;
