'use client';

import { CheckCircle, AlertCircle, UserPlus, FileText } from 'lucide-react';

const activities = [
    {
        id: 1,
        type: 'registration',
        content: 'New student registration',
        target: 'Rahul Sharma (CS-2026-001)',
        date: 'Just now',
        icon: UserPlus,
        iconBackground: 'bg-blue-100',
        iconColor: 'text-blue-600'
    },
    {
        id: 2,
        type: 'course',
        content: 'Course syllabus updated',
        target: 'Introduction to AI (CS101)',
        date: '2 minutes ago',
        icon: FileText,
        iconBackground: 'bg-yellow-100',
        iconColor: 'text-yellow-600'
    },
    {
        id: 3,
        type: 'system',
        content: 'System backup completed',
        target: 'Database Snapshot',
        date: '1 hour ago',
        icon: CheckCircle,
        iconBackground: 'bg-green-100',
        iconColor: 'text-green-600'
    },
    {
        id: 4,
        type: 'alert',
        content: 'Failed login attempt',
        target: 'Admin Console',
        date: '3 hours ago',
        icon: AlertCircle,
        iconBackground: 'bg-red-100',
        iconColor: 'text-red-600'
    },
];

export default function ActivityFeed() {
    return (
        <div className="flow-root">
            <ul role="list" className="-mb-8">
                {activities.map((activity, activityIdx) => (
                    <li key={activity.id}>
                        <div className="relative pb-8">
                            {activityIdx !== activities.length - 1 ? (
                                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                            ) : null}
                            <div className="relative flex space-x-3">
                                <div>
                                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${activity.iconBackground}`}>
                                        <activity.icon className={`h-5 w-5 ${activity.iconColor}`} aria-hidden="true" />
                                    </span>
                                </div>
                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            {activity.content} <span className="font-medium text-gray-900">{activity.target}</span>
                                        </p>
                                    </div>
                                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                        <time dateTime={activity.date}>{activity.date}</time>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
