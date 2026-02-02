"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
    LayoutDashboard,
    Users,
    GraduationCap,
    BookOpen,
    Calendar,
    LogOut,
    Menu,
    X,
    FileText
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SidebarItem {
    name: string;
    href: string;
    icon: React.ElementType;
}

interface DashboardLayoutProps {
    children: React.ReactNode;
    userRole: 'admin' | 'faculty' | 'student';
    userName: string;
    userEmail: string;
}

export default function DashboardLayout({
    children,
    userRole,
    userName,
    userEmail
}: DashboardLayoutProps) {
    const pathname = usePathname();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const adminLinks: SidebarItem[] = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Students', href: '/admin/students', icon: Users },
        { name: 'Faculty', href: '/admin/faculty', icon: GraduationCap },
        { name: 'Courses', href: '/admin/courses', icon: BookOpen },
        { name: 'Departments', href: '/admin/departments', icon: FileText },
    ];

    const facultyLinks: SidebarItem[] = [
        { name: 'Dashboard', href: '/faculty/dashboard', icon: LayoutDashboard },
        { name: 'My Classes', href: '/faculty/classes', icon: Users },
        { name: 'Attendance', href: '/faculty/attendance', icon: Calendar },
        { name: 'Marks Entry', href: '/faculty/marks', icon: FileText },
    ];

    const studentLinks: SidebarItem[] = [
        { name: 'Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
        { name: 'My Courses', href: '/student/courses', icon: BookOpen },
        { name: 'Attendance', href: '/student/attendance', icon: Calendar },
        { name: 'Results', href: '/student/results', icon: FileText },
    ];

    const links = userRole === 'admin' ? adminLinks :
        userRole === 'faculty' ? facultyLinks : studentLinks;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-200 lg:relative lg:translate-x-0",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="h-16 flex items-center px-6 border-b border-gray-100">
                        <GraduationCap className="h-8 w-8 text-primary-600 mr-2" />
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600">
                            College Portal
                        </span>
                        <button
                            className="ml-auto lg:hidden"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>

                    {/* User Profile Summary */}
                    <div className="p-6 bg-primary-50/50">
                        <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                                {userName.charAt(0)}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
                                <p className="text-xs text-gray-500 truncate capitalize">{userRole}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                        {links.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                                        isActive
                                            ? "bg-primary-50 text-primary-700 shadow-sm"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    )}
                                >
                                    <item.icon className={cn(
                                        "mr-3 h-5 w-5 transition-colors",
                                        isActive ? "text-primary-600" : "text-gray-400 group-hover:text-gray-500"
                                    )} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-gray-100">
                        <button
                            onClick={() => signOut({ callbackUrl: '/login' })}
                            className="flex w-full items-center px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                        >
                            <LogOut className="mr-3 h-5 w-5" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="bg-white border-b border-gray-200 lg:hidden">
                    <div className="h-16 flex items-center px-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                        <span className="ml-4 text-lg font-semibold text-gray-900">Dashboard</span>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
