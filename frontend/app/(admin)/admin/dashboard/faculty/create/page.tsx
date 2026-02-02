import { Metadata } from 'next';
import FacultyForm from '@/components/admin/faculty/faculty-form';

export const metadata: Metadata = {
    title: 'Create Faculty | College Admin',
};

export default function CreateFacultyPage() {
    return (
        <div>
            <FacultyForm />
        </div>
    );
}
