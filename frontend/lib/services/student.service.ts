import { apiClient } from "@/lib/api-client";
import { z } from "zod";
import { CreateStudentSchema } from "@/lib/validators/student";

export type Student = z.infer<typeof CreateStudentSchema> & { _id: string };
export type CreateStudentInput = z.infer<typeof CreateStudentSchema>;

export type ApiResponse<T> = {
    success: boolean;
    data: T;
    pagination?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
};

export const studentService = {
    getAll: (params?: { page?: number; limit?: number; search?: string }) => {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.append("page", params.page.toString());
        if (params?.limit) searchParams.append("limit", params.limit.toString());
        if (params?.search) searchParams.append("search", params.search);

        return apiClient.get<ApiResponse<Student[]>>(`/students?${searchParams.toString()}`);
    },

    getById: (id: string) => {
        return apiClient.get<ApiResponse<Student>>(`/students/${id}`);
    },

    create: (data: CreateStudentInput) => {
        return apiClient.post<ApiResponse<Student>>("/students", data);
    },

    update: (id: string, data: Partial<CreateStudentInput>) => {
        return apiClient.put<ApiResponse<Student>>(`/students/${id}`, data);
    },

    delete: (id: string) => {
        return apiClient.delete(`/students/${id}`);
    },
};
