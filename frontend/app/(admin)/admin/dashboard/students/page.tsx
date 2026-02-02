import { Metadata } from 'next';
import StudentTable from '@/components/admin/students/student-table';

export const metadata: Metadata = {
    title: 'Manage Students | College Admin',
};

export default function StudentsPage() {
    return (
        <div>
            <StudentTable />
        </div>
    );
}
