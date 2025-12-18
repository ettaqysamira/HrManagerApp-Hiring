import api from "./api";

const PRESENCE_API_URL = "/Presence";

const scan = async (employeeId, shift, qrContent) => {
    return await api.post(PRESENCE_API_URL, {
        employeeId,
        shift,
        qrContent,
    });
};

const getPresences = async (date, employeeId) => {
    const params = {};
    if (date) params.date = date;
    if (employeeId) params.employeeId = employeeId;
    return await api.get(PRESENCE_API_URL, { params });
};

const PresenceService = {
    scan,
    getPresences,
};

export default PresenceService;
