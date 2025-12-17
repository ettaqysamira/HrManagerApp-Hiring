import api from "./api";

const ATTENDANCE_API_URL = "/attendance";

const scan = async (employeeId, shift, qrContent) => {
    return await api.post(ATTENDANCE_API_URL, {
        employeeId,
        shift,
        qrContent,
    });
};

const getAttendances = async (date, employeeId) => {
    const params = {};
    if (date) params.date = date;
    if (employeeId) params.employeeId = employeeId;
    return await api.get(ATTENDANCE_API_URL, { params });
};

const AttendanceService = {
    scan,
    getAttendances,
};

export default AttendanceService;
