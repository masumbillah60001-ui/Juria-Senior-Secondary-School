import { apiClient } from '@/lib/api-client';

export interface Department {
    _id: string;
    name: string;
    code: string;
    description?: string;
    hod?: {
        _id: string;
        firstName: string;
        lastName: string;
    } | string;
    establishedYear?: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateDepartmentData {
    name: string;
    code: string;
    description?: string;
    hod?: string;
    establishedYear?: number;
    isActive?: boolean;
}

export interface UpdateDepartmentData extends Partial<CreateDepartmentData> { }

export const departmentService = {
    getAll: async (params?: { page?: number; limit?: number; search?: string }) => {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.append("page", params.page.toString());
        if (params?.limit) searchParams.append("limit", params.limit.toString());
        if (params?.search) searchParams.append("search", params.search);

        return apiClient.get<{
            data: Department[];
            pagination: {
                total: number;
                page: number;
                totalPages: number;
            };
        }>(`/departments?${searchParams.toString()}`);
    },

    getById: async (id: string) => {
        return apiClient.get<{ data: Department }>(`/departments/${id}`);
    },

    create: async (data: CreateDepartmentData) => {
        return apiClient.post<{ data: Department }>('/departments', data);
    },

    update: async (id: string, data: UpdateDepartmentData) => {
        return apiClient.put<{ data: Department }>(`/departments/${id}`, data);
    },

    delete: async (id: string) => {
        return apiClient.delete<{ message: string }>(`/departments/${id}`);
    },
};
