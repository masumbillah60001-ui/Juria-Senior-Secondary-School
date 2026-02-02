'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { courseService } from '@/lib/services/course.service';
import { departmentService } from '@/lib/services/department.service';
import { toast } from 'react-hot-toast';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Schema
const courseSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    code: z.string().min(2, 'Code must be at least 2 characters').toUpperCase(),
    department: z.string().min(1, 'Department is required'),
    degree: z.enum(['Diploma', 'UG', 'PG', 'PhD']),
    duration: z.number().min(1, 'Duration must be at least 1 year'),
    totalSemesters: z.number().min(1, 'Total semesters must be at least 1'),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
});

type CourseFormData = z.infer<typeof courseSchema>;

interface CourseFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export default function CourseForm({ initialData, isEditing = false }: CourseFormProps) {
    const router = useRouter();
    const queryClient = useQueryClient();

    // Fetch Departments for Dropdown
    const { data: departmentsResponse, isLoading: isLoadingDepts } = useQuery({
        queryKey: ['departments-list'],
        queryFn: () => departmentService.getAll({ limit: 100 }), // Fetch all or enough
    });
    const departments = departmentsResponse?.data || [];

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CourseFormData>({
        resolver: zodResolver(courseSchema),
        defaultValues: initialData ? {
            ...initialData,
            department: initialData.department?._id || initialData.department // Handle populated or ID
        } : {
            name: '',
            code: '',
            department: '',
            degree: 'UG',
            duration: 4,
            totalSemesters: 8,
            description: '',
            isActive: true,
        },
    });

    const mutation = useMutation({
        mutationFn: (data: CourseFormData) => {
            if (isEditing && initialData?._id) {
                return courseService.update(initialData._id, data);
            }
            return courseService.create(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['courses'] });
            toast.success(`Course ${isEditing ? 'updated' : 'created'} successfully`);
            router.push('/admin/dashboard/courses');
            router.refresh();
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Something went wrong');
        },
    });

    const onSubmit = (data: CourseFormData) => {
        mutation.mutate(data);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link
                    href="/admin/dashboard/courses"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors mb-2"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Courses
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">
                    {isEditing ? 'Edit Course' : 'Create New Course'}
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                    {isEditing ? 'Update existing course details.' : 'Add a new academic course to the curriculum.'}
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-sm rounded-xl border border-gray-100 p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Name *</label>
                        <input
                            {...register('name')}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            placeholder="e.g. B.Tech Computer Science"
                        />
                        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Code */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Code *</label>
                        <input
                            {...register('code')}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition uppercase"
                            placeholder="e.g. BTCS-2024"
                        />
                        {errors.code && <p className="text-sm text-red-500 mt-1">{errors.code.message}</p>}
                    </div>

                    {/* Department */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                        <select
                            {...register('department')}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                            disabled={isLoadingDepts}
                        >
                            <option value="">Select Department</option>
                            {departments.map((dept) => (
                                <option key={dept._id} value={dept._id}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                        {errors.department && <p className="text-sm text-red-500 mt-1">{errors.department.message}</p>}
                    </div>

                    {/* Degree */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Degree Type *</label>
                        <select
                            {...register('degree')}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                        >
                            <option value="UG">Undergraduate (UG)</option>
                            <option value="PG">Postgraduate (PG)</option>
                            <option value="Diploma">Diploma</option>
                            <option value="PhD">PhD</option>
                        </select>
                        {errors.degree && <p className="text-sm text-red-500 mt-1">{errors.degree.message}</p>}
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Years) *</label>
                        <input
                            type="number"
                            {...register('duration', { valueAsNumber: true })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        />
                        {errors.duration && <p className="text-sm text-red-500 mt-1">{errors.duration.message}</p>}
                    </div>

                    {/* Semesters */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Total Semesters *</label>
                        <input
                            type="number"
                            {...register('totalSemesters', { valueAsNumber: true })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        />
                        {errors.totalSemesters && <p className="text-sm text-red-500 mt-1">{errors.totalSemesters.message}</p>}
                    </div>

                    {/* Description */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            {...register('description')}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            placeholder="Brief description of the course..."
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
                            <span className="text-sm text-gray-700">Course is currently active and accepting students</span>
                        </label>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <Link
                        href="/admin/dashboard/courses"
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
                            'Save Course'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
