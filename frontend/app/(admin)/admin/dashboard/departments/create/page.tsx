import { Metadata } from 'next';
import DepartmentForm from '@/components/admin/departments/department-form';

export const metadata: Metadata = {
    title: 'Create Department | College Admin',
};

export default function CreateDepartmentPage() {
    return (
        <div>
            <DepartmentForm />
        </div>
    );
}
