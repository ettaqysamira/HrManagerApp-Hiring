const API_URL = "http://localhost:5076/api/Auth";
export interface LoginResponse {
    token: string;
    user: {
        id: number;
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
                    role: data.user.role || data.user.Role || "Employee"
                };
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
        return userStr ? JSON.parse(userStr) : null;
    }
};
