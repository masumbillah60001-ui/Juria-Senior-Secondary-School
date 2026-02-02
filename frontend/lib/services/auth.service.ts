import { apiClient } from "@/lib/api-client";
import { z } from "zod";
import { LoginFormSchema, RegisterFormSchema } from "@/lib/validators/auth";

export type LoginInput = z.infer<typeof LoginFormSchema>;
export type RegisterInput = z.infer<typeof RegisterFormSchema>;

export const authService = {
    login: (data: LoginInput) => {
        return apiClient.post("/auth/login", data);
    },

    register: (data: RegisterInput) => {
        return apiClient.post("/auth/register", data);
    },

    logout: () => {
        return apiClient.post("/auth/logout", {});
    },

    getCurrentUser: () => {
        return apiClient.get("/auth/me");
    },
};
