'use client';

import { useQuery, useIsFetching } from '@tanstack/react-query';
import { Users, GraduationCap, BookOpen, Clock, ArrowUp, RefreshCw } from 'lucide-react';
import { apiClient } from '@/lib/api-client';

export default function DashboardStats() {
    const isFetching = useIsFetching();

    // Parallel queries for stats
    const { data: studentsData } = useQuery({
        queryKey: ['students-stats'],
        queryFn: () => apiClient.get<any>('/students?limit=1')
    });

    const { data: facultyData } = useQuery({
        queryKey: ['faculty-stats'],
        queryFn: () => apiClient.get<any>('/faculty?limit=1')
    });

    const { data: coursesData } = useQuery({
        queryKey: ['courses-stats'],
        queryFn: () => apiClient.get<any>('/courses?limit=1')
    });

    const stats = [
        {
            name: 'Total Students',
            value: studentsData?.pagination?.total || 0,
            icon: Users,
            color: 'text-blue-600',
            bg: 'bg-blue-100',
            trend: '+12%', // Mock trend for now
            trendUp: true
        },
        {
            name: 'Total Faculty',
            value: facultyData?.pagination?.total || 0,
            icon: GraduationCap,
            color: 'text-green-600',
            bg: 'bg-green-100',
            trend: '+4%',
            trendUp: true
        },
        {
            name: 'Active Courses',
            value: coursesData?.pagination?.total || 0,
            icon: BookOpen,
            color: 'text-purple-600',
            bg: 'bg-purple-100',
            trend: '0%',
            trendUp: true
        }
    ];

    return (
        <div>
            <div className="flex justify-end mb-2">
                {isFetching > 0 && (
                    <div className="flex items-center text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full animate-pulse">
                        <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                        Syncing...
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((item) => (
                    <div key={item.name} className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden border border-gray-200">
                        <dt>
                            <div className={`absolute rounded-md p-3 ${item.bg}`}>
                                <item.icon className={`h-6 w-6 ${item.color}`} aria-hidden="true" />
                            </div>
                            <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
                        </dt>
                        <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                            <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
                            <p className={`ml-2 flex items-baseline text-sm font-semibold ${item.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                                {item.trendUp ? (
                                    <ArrowUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" aria-hidden="true" />
                                ) : (
                                    <ArrowUp className="self-center flex-shrink-0 h-4 w-4 text-red-500 rotate-180" aria-hidden="true" />
                                )}
                                <span className="sr-only">{item.trendUp ? 'Increased' : 'Decreased'} by</span>
                                {item.trend}
                            </p>
                        </dd>
                    </div>
                ))}
            </div>
        </div>
    );
}
