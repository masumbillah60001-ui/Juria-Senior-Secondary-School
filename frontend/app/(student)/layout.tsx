import { redirect } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getCurrentUser } from '@/lib/utils/auth';

export default async function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getCurrentUser();

    if (!user) {
        redirect('/login');
    }

    if (user.role !== 'student') {
        // If not a student, redirect to appropriate dashboard or unauthorized
        // For now, let's just allow or redirect based on strictness.
        // Ideally: redirect(`/${user.role}/dashboard`);
    }

    return (
        <DashboardLayout
            userRole="student" // Or derive from user.role w/ casting if needed
            userName={user.name || 'Student'}
            userEmail={user.email || ''}
        >
            {children}
        </DashboardLayout>
    );
}
