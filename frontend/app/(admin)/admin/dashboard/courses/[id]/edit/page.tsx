'use client';

import { useQuery } from '@tanstack/react-query';
import { courseService } from '@/lib/services/course.service';
import CourseForm from '@/components/admin/courses/course-form';
import { Loader2 } from 'lucide-react';
import { use } from 'react';

export default function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const { data: response, isLoading, isError } = useQuery({
        queryKey: ['course', id],
        queryFn: () => courseService.getById(id),
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (isError || !response?.data) {
        return (
            <div className="text-center text-red-500 py-12">
                Course not found.
            </div>
        );
    }

    return (
        <div>
            <CourseForm initialData={response.data} isEditing={true} />
        </div>
    );
}
