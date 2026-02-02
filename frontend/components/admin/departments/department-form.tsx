'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { departmentService } from '@/lib/services/department.service';
import { toast } from 'react-hot-toast';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Schema
const departmentSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    code: z.string().min(2, 'Code must be at least 2 characters').toUpperCase(),
    description: z.string().optional(),
    establishedYear: z.number().min(1900, 'Invalid year').max(new Date().getFullYear() + 1, 'Invalid year').optional(),
    isActive: z.boolean().optional(),
});

type DepartmentFormData = z.infer<typeof departmentSchema>;

interface DepartmentFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export default function DepartmentForm({ initialData, isEditing = false }: DepartmentFormProps) {
    const router = useRouter();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<DepartmentFormData>({
        resolver: zodResolver(departmentSchema),
        defaultValues: initialData || {
            name: '',
            code: '',
            description: '',
            establishedYear: new Date().getFullYear(),
            isActive: true,
        },
    });

    const mutation = useMutation({
        mutationFn: (data: DepartmentFormData) => {
            if (isEditing && initialData?._id) {
                return departmentService.update(initialData._id, data);
            }
            return departmentService.create(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['departments'] });
            toast.success(`Department ${isEditing ? 'updated' : 'created'} successfully`);
            router.push('/admin/dashboard/departments');
            router.refresh();
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Something went wrong');
        },
    });

    const onSubmit = (data: DepartmentFormData) => {
        mutation.mutate(data);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link
                    href="/admin/dashboard/departments"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors mb-2"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Departments
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">
                    {isEditing ? 'Edit Department' : 'Create New Department'}
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                    {isEditing ? 'Update existing department details.' : 'Add a new academic department to the system.'}
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-sm rounded-xl border border-gray-100 p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department Name *</label>
                        <input
                            {...register('name')}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            placeholder="e.g. Computer Science & Engineering"
                        />
                        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Code */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Code *</label>
                        <input
                            {...register('code')}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition uppercase"
                            placeholder="e.g. CSE"
                        />
                        <p className="text-xs text-gray-500 mt-1">Unique identifier (uppercase)</p>
                        {errors.code && <p className="text-sm text-red-500 mt-1">{errors.code.message}</p>}
                    </div>

                    {/* Established Year */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
                        <input
                            type="number"
                            {...register('establishedYear', { valueAsNumber: true })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        />
                        {errors.establishedYear && <p className="text-sm text-red-500 mt-1">{errors.establishedYear.message}</p>}
                    </div>

                    {/* Description */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            {...register('description')}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            placeholder="Brief description of the department..."
                        />
                        {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                {...register('isActive')}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                            />
                            <span className="text-sm text-gray-700">Detailed Active Status</span>
                        </label>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <Link
                        href="/admin/dashboard/departments"
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting || mutation.isPending}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting || mutation.isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            'Save Department'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
