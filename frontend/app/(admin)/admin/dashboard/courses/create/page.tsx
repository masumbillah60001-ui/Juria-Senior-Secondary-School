import { Metadata } from 'next';
import CourseForm from '@/components/admin/courses/course-form';

export const metadata: Metadata = {
    title: 'Create Course | College Admin',
};

export default function CreateCoursePage() {
    return (
        <div>
            <CourseForm />
        </div>
    );
}
