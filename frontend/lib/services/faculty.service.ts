import { apiClient } from "@/lib/api-client";
import { z } from "zod";
import { CreateFacultySchema } from "@/lib/validators/faculty";

export interface Faculty {
    _id: string;
    employeeId: string;
    designation: string;
    department: { _id: string; name: string } | string;
    userId: {
        _id: string;
        email: string;
        profile: {
            firstName: string;
            lastName: string;
            phone?: string;
        };
    };
    joiningDate: string;
    status: string;
    qualifications?: any[];
    experience?: any[];
    publications?: any[];
}

export type CreateFacultyInput = z.infer<typeof CreateFacultySchema>;

import { ApiResponse } from "./student.service"; // Reuse type or redefine

export const facultyService = {
    getAll: (params?: { page?: number; limit?: number; search?: string }) => {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.append("page", params.page.toString());
        if (params?.limit) searchParams.append("limit", params.limit.toString());
        if (params?.search) searchParams.append("search", params.search);

        return apiClient.get<ApiResponse<Faculty[]>>(`/faculty?${searchParams.toString()}`);
    },

    getById: (id: string) => {
        return apiClient.get<ApiResponse<Faculty>>(`/faculty/${id}`);
    },

    create: (data: CreateFacultyInput) => {
        return apiClient.post<ApiResponse<Faculty>>("/faculty", data);
    },

    update: (id: string, data: Partial<CreateFacultyInput>) => {
        return apiClient.put<ApiResponse<Faculty>>(`/faculty/${id}`, data);
    },

    delete: (id: string) => {
        return apiClient.delete(`/faculty/${id}`);
    },
};
