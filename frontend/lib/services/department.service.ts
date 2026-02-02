import { apiClient } from "@/lib/api-client";
import { z } from "zod";
import { CreateDepartmentSchema } from "@/lib/validators/department";

export type Department = z.infer<typeof CreateDepartmentSchema> & { _id: string };
export type CreateDepartmentInput = z.infer<typeof CreateDepartmentSchema>;

export const departmentService = {
    getAll: () => {
        return apiClient.get<Department[]>("/departments");
    },

    getById: (id: string) => {
        return apiClient.get<Department>(`/departments/${id}`);
    },

    create: (data: CreateDepartmentInput) => {
        return apiClient.post<Department>("/departments", data);
    },

    update: (id: string, data: Partial<CreateDepartmentInput>) => {
        return apiClient.put<Department>(`/departments/${id}`, data);
    },

    delete: (id: string) => {
        return apiClient.delete(`/departments/${id}`);
    },
};
