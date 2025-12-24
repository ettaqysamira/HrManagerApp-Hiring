const API_URL = "http://localhost:5076/api/Auth";
export interface LoginResponse {
    token: string;
    user: {
        id: number;
        employeeId?: string;
        firstName: string;
        lastName: string;
        login: string;
        role: string;
    };
}

export const authService = {
    async login(credentials: { login: string; password: string }): Promise<LoginResponse> {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erreur lors de la connexion");
            }

            const data = await response.json();

            if (data.user) {
                const normalizedUser = {
                    ...data.user,
                    name: data.user.name || (data.user.firstName && data.user.lastName ? `${data.user.firstName} ${data.user.lastName}` : (data.user.FirstName && data.user.LastName ? `${data.user.FirstName} ${data.user.LastName}` : null)),
                    role: data.user.role || data.user.Role || "Employee",
                    employeeId: data.user.employeeId || data.user.EmployeeId,
                    firstName: data.user.firstName || data.user.FirstName,
                    lastName: data.user.lastName || data.user.LastName,
                    photoUrl: data.user.photoUrl || data.user.PhotoUrl
                };

                if (!normalizedUser.name && normalizedUser.firstName) {
                    normalizedUser.name = `${normalizedUser.firstName} ${normalizedUser.lastName || ''}`.trim();
                }

                data.user = normalizedUser;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            return data;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    },

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },

    getCurrentUser() {
        const userStr = localStorage.getItem("user");
        if (!userStr) return null;

        try {
            const user = JSON.parse(userStr);
            if (user && !user.name && user.firstName) {
                user.name = `${user.firstName} ${user.lastName || ''}`.trim();
            }
            return user;
        } catch {
            return null;
        }
    }
};
