import { Metadata } from 'next';
import StudentForm from '@/components/admin/students/student-form';

export const metadata: Metadata = {
    title: 'Create Student | College Admin',
};

export default function CreateStudentPage() {
    return (
        <div>
            <StudentForm />
        </div>
    );
}
