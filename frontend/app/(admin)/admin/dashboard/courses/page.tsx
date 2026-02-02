import { Metadata } from 'next';
import CourseTable from '@/components/admin/courses/course-table';

export const metadata: Metadata = {
    title: 'Manage Courses | College Admin',
};

export default function CoursesPage() {
    return (
        <div>
            <CourseTable />
        </div>
    );
}
