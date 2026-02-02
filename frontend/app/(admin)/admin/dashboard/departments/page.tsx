import { Metadata } from 'next';
import DepartmentTable from '@/components/admin/departments/department-table';

export const metadata: Metadata = {
    title: 'Manage Departments | College Admin',
};

export default function DepartmentsPage() {
    return (
        <div>
            <DepartmentTable />
        </div>
    );
}
