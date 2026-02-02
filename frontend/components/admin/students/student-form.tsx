'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import { CreateStudentSchema } from '@/lib/validators/student';
import Link from 'next/link';

type StudentFormData = z.infer<typeof CreateStudentSchema>;

export default function StudentForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [departments, setDepartments] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<any[]>([]);

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<StudentFormData>({
        resolver: zodResolver(CreateStudentSchema),
        defaultValues: {
            hostel: { isHostelite: false },
            transport: { usesTransport: false },
            academicInfo: {
                semester: 1,
            }
        }
    });

    const selectedDept = watch('academicInfo.department');

    // Fetch Departments and Courses
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [deptRes, courseRes] = await Promise.all([
                    fetch('/api/v1/departments'),
                    fetch('/api/v1/courses')
                ]);
                const deptData = await deptRes.json();
                const courseData = await courseRes.json();

                if (deptData.success) setDepartments(deptData.data);
                if (courseData.success) setCourses(courseData.data);
            } catch (error) {
                console.error('Error fetching dropdown data', error);
            }
        };
        fetchData();
    }, []);

    // Filter courses based on department
    useEffect(() => {
        if (selectedDept && courses.length > 0) {
            setFilteredCourses(courses.filter(c => c.department._id === selectedDept || c.department === selectedDept));
        } else {
            setFilteredCourses([]);
        }
    }, [selectedDept, courses]);

    const onSubmit = async (data: StudentFormData) => {
        setLoading(true);
        try {
            const res = await fetch('/api/v1/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(JSON.stringify(result.error) || 'Failed to create student');
            }

            alert('Student created successfully!');
            router.push('/admin/dashboard/students');
            router.refresh();

        } catch (error: any) {
            console.error('Submission error:', error);
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/dashboard/students" className="p-2 hover:bg-gray-100 rounded-full transition">
                        <ArrowLeft className="h-5 w-5 text-gray-500" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Add New Student</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal Details */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Personal Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                            <input
                                {...register('firstName')}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                            />
                            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                            <input
                                {...register('lastName')}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                            />
                            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                            <input
                                type="email"
                                {...register('email')}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input
                                {...register('phone')}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                            <input
                                type="date"
                                {...register('dateOfBirth')}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                            <select
                                {...register('gender')}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Academic Info */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Academic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Admission Number *</label>
                            <input
                                {...register('admissionNumber')}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                            />
                            {errors.admissionNumber && <p className="text-red-500 text-xs mt-1">{errors.admissionNumber.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                            <select
                                {...register('academicInfo.department')}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
                            >
                                <option value="">Select Department</option>
                                {departments.map(dept => (
                                    <option key={dept._id} value={dept._id}>{dept.name}</option>
                                ))}
                            </select>
                            {errors.academicInfo?.department && <p className="text-red-500 text-xs mt-1">{errors.academicInfo.department.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Course *</label>
                            <select
                                {...register('academicInfo.course')}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
                                disabled={!selectedDept}
                            >
                                <option value="">Select Course</option>
                                {filteredCourses.map(course => (
                                    <option key={course._id} value={course._id}>{course.name}</option>
                                ))}
                            </select>
                            {errors.academicInfo?.course && <p className="text-red-500 text-xs mt-1">{errors.academicInfo.course.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                            <input
                                type="number"
                                {...register('academicInfo.semester', { valueAsNumber: true })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                                min={1}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Batch / Academic Year</label>
                            <input
                                placeholder="e.g. 2024-2028"
                                {...register('academicInfo.academicYear')}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition disabled:opacity-50 shadow-lg shadow-blue-200"
                    >
                        {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
                        Create Student
                    </button>
                </div>
            </form>
        </div>
    );
}
