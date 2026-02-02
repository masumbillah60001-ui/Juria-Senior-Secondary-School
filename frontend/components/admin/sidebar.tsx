'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Users,
    GraduationCap,
    Building2,
    BookOpen,
    LayoutDashboard,
    LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { signOut } from 'next-auth/react';

const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Students', href: '/admin/dashboard/students', icon: Users },
    { name: 'Faculty', href: '/admin/dashboard/faculty', icon: GraduationCap },
    { name: 'Departments', href: '/admin/dashboard/departments', icon: Building2 },
    { name: 'Courses', href: '/admin/dashboard/courses', icon: BookOpen },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col w-64 bg-slate-900 min-h-screen text-white">
            <div className="flex items-center justify-center h-16 bg-slate-950">
                <span className="text-xl font-bold tracking-wider">COLLEGE ADMIN</span>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto px-4 py-4 space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                                isActive
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                            )}
                        >
                            <Icon className="mr-3 h-5 w-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </div>
            <div className="p-4 bg-slate-950">
                <button
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className="flex items-center w-full px-4 py-2 text-sm font-medium text-slate-300 rounded-lg hover:bg-red-900/50 hover:text-red-400 transition-colors"
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
