import { Metadata } from 'next';
import FacultyTable from '@/components/admin/faculty/faculty-table';

export const metadata: Metadata = {
    title: 'Manage Faculty | College Admin',
};

export default function FacultyPage() {
    return (
        <div>
            <FacultyTable />
        </div>
    );
}
