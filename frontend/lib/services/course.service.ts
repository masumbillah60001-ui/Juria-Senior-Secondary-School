import { apiClient } from '@/lib/api-client';

export interface Course {
    _id: string;
    name: string;
    code: string;
    department: {
        _id: string;
        name: string;
    } | string;
    degree: 'Diploma' | 'UG' | 'PG' | 'PhD';
    duration: number;
    totalSemesters: number;
    description?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateCourseData {
    name: string;
    code: string;
    department: string; // Department ID
    degree: 'Diploma' | 'UG' | 'PG' | 'PhD';
    duration: number;
    totalSemesters: number;
    description?: string;
    isActive?: boolean;
}

export interface UpdateCourseData extends Partial<CreateCourseData> { }

export const courseService = {
    getAll: async (params?: { page?: number; limit?: number; search?: string }) => {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.append("page", params.page.toString());
        if (params?.limit) searchParams.append("limit", params.limit.toString());
        if (params?.search) searchParams.append("search", params.search);

        return apiClient.get<{
            data: Course[];
            pagination: {
                total: number;
                page: number;
                totalPages: number;
            };
        }>(`/courses?${searchParams.toString()}`);
    },

    getById: async (id: string) => {
        return apiClient.get<{ data: Course }>(`/courses/${id}`);
    },

    create: async (data: CreateCourseData) => {
        return apiClient.post<{ data: Course }>('/courses', data);
    },

    update: async (id: string, data: UpdateCourseData) => {
        return apiClient.put<{ data: Course }>(`/courses/${id}`, data);
    },

    delete: async (id: string) => {
        return apiClient.delete<{ message: string }>(`/courses/${id}`);
    },
};
