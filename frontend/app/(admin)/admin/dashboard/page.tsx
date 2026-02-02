import { auth, signOut } from '@/auth';
import DashboardStats from '@/components/admin/dashboard/dashboard-stats';
import ActivityFeed from '@/components/admin/dashboard/activity-feed';

export default async function AdminDashboard() {
    const session = await auth();

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-700 mr-4">Welcome, {session?.user?.name || session?.user?.email}</span>
                            <form
                                action={async () => {
                                    'use server';
                                    await signOut();
                                }}
                            >
                                <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                                    Sign Out
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                    <div className="px-4 py-5 sm:px-6">
                        <h2 className="text-lg font-medium text-gray-900">System Overview</h2>
                        <p className="mt-1 text-sm text-gray-500">Quick stats and management links.</p>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <DashboardStats />

                        <div className="mt-8">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                            <ActivityFeed />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
