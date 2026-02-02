import { apiClient } from "@/lib/api-client";
import { z } from "zod";
import { CreateCourseSchema } from "@/lib/validators/course";

export type Course = z.infer<typeof CreateCourseSchema> & { _id: string };
export type CreateCourseInput = z.infer<typeof CreateCourseSchema>;

export const courseService = {
    getAll: () => {
        return apiClient.get<Course[]>("/courses");
    },

    getById: (id: string) => {
        return apiClient.get<Course>(`/courses/${id}`);
    },

    create: (data: CreateCourseInput) => {
        return apiClient.post<Course>("/courses", data);
    },

    update: (id: string, data: Partial<CreateCourseInput>) => {
        return apiClient.put<Course>(`/courses/${id}`, data);
    },

    delete: (id: string) => {
        return apiClient.delete(`/courses/${id}`);
    },
};
