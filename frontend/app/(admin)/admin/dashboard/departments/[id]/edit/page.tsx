'use client';

import { useQuery } from '@tanstack/react-query';
import { departmentService } from '@/lib/services/department.service';
import DepartmentForm from '@/components/admin/departments/department-form';
import { Loader2 } from 'lucide-react';
import { use, act } from 'react';

export default function EditDepartmentPage({ params }: { params: Promise<{ id: string }> }) {
    // Correctly unwrap params using React.use() or await if it was server component. 
    // Since this is a client component, we rely on it being passed as a Promise in Next.js 15+ 
    // BUT usually params are props. Let's fix this for Next.js 15+ standard.
    // Actually, in client components, params is not a promise. In server components it is. 
    // Let's assume this is a Client Component due to 'use client'.
    // Next.js 15 might make params async even in client components? No, usually server.
    // Let's safe-guard:

    // Wait, 'use client' means we can't async await params in the main body simply. 
    // However, for simplicity in 'use client', standard props work in Next 13/14.
    // In Next 15, `params` is a Promise. We need to unwrap it.

    const { id } = use(params);

    const { data: response, isLoading, isError } = useQuery({
        queryKey: ['department', id],
        queryFn: () => departmentService.getById(id),
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
                Department not found.
            </div>
        );
    }

    return (
        <div>
            <DepartmentForm initialData={response.data} isEditing={true} />
        </div>
    );
}
