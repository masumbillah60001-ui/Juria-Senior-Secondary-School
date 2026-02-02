import React from 'react';
import { getCurrentUser } from '@/lib/utils/auth';
import { BookOpen, Calendar, GraduationCap, Clock } from 'lucide-react';

export default async function StudentDashboard() {
    const user = await getCurrentUser();

    // Mock data for dashboard
    const stats = [
        { title: 'Attendance', value: '85%', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100' },
        { title: 'CGPA', value: '8.5', icon: GraduationCap, color: 'text-green-600', bg: 'bg-green-100' },
        { title: 'Total Subjects', value: '6', icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-100' },
        { title: 'Assignments', value: '2 Pending', icon: Calendar, color: 'text-orange-600', bg: 'bg-orange-100' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user?.name}!</h1>
                    <p className="text-gray-600">Here's what's happening today.</p>
                </div>
                <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg shadow-sm">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-lg ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity & Timetable */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">My Courses</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="pb-3 text-sm font-semibold text-gray-500">Subject</th>
                                    <th className="pb-3 text-sm font-semibold text-gray-500">Code</th>
                                    <th className="pb-3 text-sm font-semibold text-gray-500">Credits</th>
                                    <th className="pb-3 text-sm font-semibold text-gray-500">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {[
                                    { name: 'Data Structures', code: 'CS201', credits: 4, status: 'In Progress' },
                                    { name: 'Database Management', code: 'CS301', credits: 4, status: 'In Progress' },
                                    { name: 'Operating Systems', code: 'CS302', credits: 3, status: 'In Progress' },
                                    { name: 'Computer Networks', code: 'CS401', credits: 3, status: 'Upcoming' },
                                ].map((course, i) => (
                                    <tr key={i} className="hover:bg-gray-50">
                                        <td className="py-3 text-sm text-gray-900">{course.name}</td>
                                        <td className="py-3 text-sm text-gray-500">{course.code}</td>
                                        <td className="py-3 text-sm text-gray-500">{course.credits}</td>
                                        <td className="py-3 text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${course.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {course.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Upcoming Events</h2>
                    <div className="space-y-4">
                        {[
                            { title: 'Internal Assessment', date: 'Next Monday', type: 'Exam', color: 'bg-red-100 text-red-700' },
                            { title: 'Tech Fest Registration', date: 'Tomorrow', type: 'Event', color: 'bg-purple-100 text-purple-700' },
                            { title: 'Guest Lecture', date: 'Wed, 2:00 PM', type: 'Lecture', color: 'bg-blue-100 text-blue-700' },
                        ].map((event, i) => (
                            <div key={i} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className={`mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-blue-500`} />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{event.title}</p>
                                    <p className="text-xs text-gray-500 mt-1">{event.date}</p>
                                    <span className={`inline-block mt-2 px-2 py-0.5 text-xs rounded-full ${event.color}`}>
                                        {event.type}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
